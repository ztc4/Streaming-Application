package streamingapplication.backendkotlin.config
import java.sql.Connection
import java.sql.DriverManager
import java.sql.SQLException

fun connectToAzureSQL(): Connection? {
    val url = "jdbc:sqlserver://your-azure-server-name.database.windows.net:1433;database=your-database-name;"
    val user = "your-azure-username"
    val password = "your-azure-password"

    return try {
        DriverManager.getConnection(url, user, password)
    } catch (e: SQLException) {
        e.printStackTrace()
        null
    }
}


