const { MediaConvertClient, CreateJobCommand, DescribeEndpointsCommand  } = require("@aws-sdk/client-mediaconvert");



//  Get Media Convert URL!
async function getMediaConvertEndpoint() {
    const region = process.env.REGION;  // Use the desired region
    const mediaConvertClient = new MediaConvertClient({ region });

    try {
        // Describe endpoints for MediaConvert in the specified region
        const { Endpoints } = await mediaConvertClient.send(new DescribeEndpointsCommand({}));

        // The first endpoint should be the one to use
        const endpointUrl = Endpoints[0].Url;
        console.log("MediaConvert endpoint URL:", endpointUrl);
        return endpointUrl;
    } catch (error) {
        console.error("Error fetching MediaConvert endpoint:", error);
    }
}


exports.handler = async (event) => {
    const record = event.Records[0];
    const fileKey = record.s3.object.key;

    const mediaconvertEndpoint = getMediaConvertEndpoint();

    const mediaConvertClient = new MediaConvertClient({
        endpoint: mediaconvertEndpoint,
    });

    // Construct input file URL
    const inputFileUrl = `s3://${process.env.SOURCE_BUCKET}/${fileKey}`;

    // Setup MediaConvert job parameters (only need input URL and template)
    const jobParams = {
        Role: process.env.MEDIA_CONVERT_ROLE,
        Settings: {
            Inputs: [
                {
                    FileInput: inputFileUrl, // Use dynamic input file
                    AudioSelectors: {
                        "Audio Selector 1": {
                            DefaultSelection: "DEFAULT",
                        },
                    },
                    VideoSelector: {},
                    TimecodeSource: "ZEROBASED",
                },
            ],
            OutputGroups: [
                {
                    Name: "Apple HLS",
                    OutputGroupSettings: {
                        Type: "HLS_GROUP_SETTINGS",
                        HlsGroupSettings: {
                            TargetDurationCompatibilityMode: "LEGACY",
                            SegmentLength: 10,
                            SegmentLengthControl: "GOP_MULTIPLE",
                            Destination: `s3://${process.env.DEST_BUCKET}/${fileKey.slice(0, -4)}/`, // HLS output location
                            DestinationSettings: {
                                S3Settings: {
                                    StorageClass: "STANDARD",
                                },
                            },
                            MinSegmentLength: 0,
                            MinFinalSegmentLength: 0,
                            SegmentControl: "SINGLE_FILE",
                            ImageBasedTrickPlay: "NONE",
                        },
                    },
                    Outputs: [
                        {
                            ContainerSettings: {
                                Container: "M3U8",
                                M3u8Settings: {},
                            },
                            VideoDescription: {
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        MaxBitrate: 5000000,
                                        RateControlMode: "QVBR",
                                        SceneChangeDetect: "TRANSITION_DETECTION",
                                    },
                                },
                            },
                            AudioDescriptions: [
                                {
                                    AudioSourceName: "Audio Selector 1",
                                    CodecSettings: {
                                        Codec: "AAC",
                                        AacSettings: {
                                            Bitrate: 96000,
                                            CodingMode: "CODING_MODE_2_0",
                                            SampleRate: 48000,
                                        },
                                    },
                                },
                            ],
                            OutputSettings: {
                                HlsSettings: {},
                            },
                            NameModifier: "_hls",
                        },
                    ],
                },
            ],
        },
        AccelerationSettings: {
            Mode: "DISABLED",
        },
        StatusUpdateInterval: "SECONDS_60",
        Priority: 0,
        HopDestinations: [],
    };

    try {
        // Create the MediaConvert job
        const command = new CreateJobCommand(jobParams);
        const response = await mediaConvertClient.send(command);
        console.log("MediaConvert job created successfully:", response);
    } catch (error) {
        console.error("Error creating MediaConvert job:", error);
        throw error;
    }
};



