# <img src="public/icon.png" alt="LanDropr Logo" style="width: 20px; height: 20px;"> LanDropr

[![npm version](https://img.shields.io/npm/v/landropr)](https://www.npmjs.com/package/landropr)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

LanDropr is a fast, secure, and easy-to-use file sharing application designed for local networks. Share files between devices on the same network without any complicated setup or external services.

## Features

- Local network file sharing
- QR code for easy device connection
- Fast file transfers
- Peer-to-peer connections
- Simple drag-and-drop interface
- Web-based - no installation needed on client devices

## Installation

```bash
# Install globally
npm install -g landropr

# Or use npx
npx landropr
```

## Usage

1. Start the LanDropr server:

   ```bash
   landropr
   ```

   Or with a custom port:

   ```bash
   landropr --port 3000
   ```

2. Open your browser and navigate to the displayed local URL (e.g., `http://localhost:3000`)

3. Scan the QR code with another device on the same network to connect

4. Drag and drop files to share them instantly

## Development

1. Clone the repository:

   ```bash
   git clone https://github.com/deestarks/landropr.git
   cd landropr
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Next.js and TypeScript
- Uses WebSockets for real-time communication
- Styled with Tailwind CSS

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

For any questions or feedback, please open an issue on GitHub.
