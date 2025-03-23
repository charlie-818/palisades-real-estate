# Palisades Real Estate Investment Platform

A modern platform for tokenized real estate investment focused on the Pacific Palisades area.

## Deploying to Netlify

### Method 1: One-Click Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/palisades)

### Method 2: Manual Deployment

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to your Netlify account
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

### Troubleshooting Netlify Deployment

If you encounter issues with your Next.js deployment on Netlify:

1. Verify that the `@netlify/plugin-nextjs` plugin is correctly installed
2. Check that your `netlify.toml` file has the proper configuration
3. Ensure your Node.js version is at least 16.x (set in `netlify.toml`)
4. Try deploying with the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --build --prod
   ```
5. Review the build logs in the Netlify dashboard for specific errors

## Local Development

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Test the Netlify build locally
npm run netlify-build

# Start the Netlify development environment
netlify dev
```

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_WEB3_PROVIDER_URL=https://mainnet.infura.io/v3/your-infura-key
```

For Netlify deployment, add these environment variables in the Netlify dashboard under Site settings > Build & deploy > Environment.

## Netlify Functions

This project utilizes Netlify Functions for serverless backend capabilities. Functions are located in the `netlify/functions` directory.

To test Netlify Functions locally:
```bash
netlify dev
```

Example API endpoints:
```
https://your-site-name.netlify.app/.netlify/functions/hello-world
https://your-site-name.netlify.app/.netlify/functions/contact-form
```

## Netlify Identity

This project includes Netlify Identity for authentication. To enable:

1. In the Netlify dashboard, go to Site settings > Identity
2. Click "Enable Identity"
3. Configure registration preferences
4. Set up external providers (optional)

To test Identity locally, use `netlify dev` which will connect to your site's Identity service.

## Features

- Blockchain-based fractional property ownership
- Smart contracts for automated agreement execution
- KYC/AML verification for regulatory compliance
- Investor dashboard for portfolio tracking
- Property listing with detailed information
- Secondary marketplace for token trading

## Technical Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Netlify Functions, Node.js
- **Authentication**: Netlify Identity
- **Blockchain**: Ethereum/Polygon, Solidity Smart Contracts
- **Development Tools**: Ethers.js, Web3.js

## Development Phases

1. **Foundation** (Months 1-3): Infrastructure setup, smart contract development
2. **Platform Development** (Months 4-7): Frontend/backend implementation, compliance systems
3. **Testing and Refinement** (Months 8-9): Security audits, user testing
4. **Launch and Growth** (Months 10-12): Initial launch, feature expansion

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Compile smart contracts
npm run compile

# Deploy smart contracts to local network
npm run deploy
```

## Contact

For more information about the Palisades real estate investment platform, contact [your-email@example.com]. 