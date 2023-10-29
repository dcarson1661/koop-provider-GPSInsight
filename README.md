# Koop GPSInsight AVL Data Provider

This is a custom Koop.js provider for serving up AVL (Automatic Vehicle Location) data from GPSInsight. Koop is a flexible and extensible geospatial data provider that allows you to transform and expose geospatial data in a variety of formats and from various sources.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Example](#example)
- [Contributing](#contributing)
- [License](#license)

## Installation

Before using this Koop provider, make sure you have Node.js and npm (Node Package Manager) installed on your system.

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/koop-gpsinsight-avl.git
   ```

2. Change to the repository directory:

   ```bash
   cd koop-gpsinsight-avl
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

## Configuration

To configure the GPSInsight AVL Data Provider, you need to set up your GPSInsight API access and define your provider configuration. 

1. Obtain your GPSInsight API Key.
2. Create a configuration file named `config.json` in the root of the provider directory with the following structure:

   ```json
   {
     "gpsInsight": {
       "apiKey": "YOUR_GPSINSIGHT_API_KEY"
     }
   }
   ```

   Replace `YOUR_GPSINSIGHT_API_KEY` with your actual GPSInsight API Key.

## Usage

Once the provider is configured, you can use it to serve AVL data through Koop.js. The provider exposes the data through a RESTful API, and you can access it by specifying the provider in your requests.

To start the Koop server and use this provider:

```bash
npm start
```

Your Koop server will be available at `http://localhost:8080/` by default. You can make requests to this server to retrieve AVL data.

## Example

To request AVL data from this provider, use a URL like the following:

```
http://localhost:8080/gpsinsight/featureServer/0/query?where=1%3D1&outFields=*&format=geojson
```

This request fetches all the available data from the GPSInsight provider in GeoJSON format. You can customize the query parameters according to your needs.

## Contributing

If you'd like to contribute to this project, please follow the standard open-source practices:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Submit a pull request to the main repository.

Please make sure your code adheres to coding standards and includes appropriate documentation.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Enjoy using the Koop GPSInsight AVL Data Provider! If you have any questions or encounter issues, feel free to open an issue or contribute to the project. Happy coding!
