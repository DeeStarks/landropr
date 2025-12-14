# <img src="public/icon.png" alt="LanDropr Logo" style="width: 20px; height: 20px;"> LanDropr

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

LanDropr is a fast, and easy-to-use file sharing application designed for local networks. I created this tool because I needed a simple way to share files between my iOS and Ubuntu systems on the same network, and couldn't find a straightforward solution. Share files between devices on the same network without any complicated setup or external services.

## Features

- Local network file sharing
- QR code for easy device connection
- Fast file transfers
- Peer-to-peer connections
- Simple drag-and-drop interface
- Web-based - no installation needed on client devices

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/deestarks/landropr.git
   cd landropr
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the LanDropr server:

   ```bash
   # First run or after updates, use --build
   ./bin/landropr.js --port 3000 --build

   # Subsequent runs (no build needed)
   ./bin/landropr.js --port 3000
   ```

2. Open your browser and navigate to the displayed local URL (e.g., `http://localhost:3000`)

3. Scan the QR code with another device on the same network to connect

4. Drag and drop files to share them instantly

### Command Line Options

- `--port <number>`: Port to run the server on (default: 12000)
- `--host <host>`: Host to bind the server to (default: 0.0.0.0)
- `--build`: Build the Next.js app before starting (use after updates)
- `--verbose`: Show detailed build output
- `--no-browser`: Do not open browser automatically

## Development

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Build for production:
   ```bash
   npm run build
   ```

## Contributing

Contributions are welcome! Whether you're fixing bugs, improving documentation, or adding new features, your help is appreciated. Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Next.js and TypeScript
- Uses WebSockets for real-time communication
- Styled with Tailwind CSS

## Contact

For any questions or feedback, please open an issue on GitHub.
