# Introduction

The following website will help you check the weather of a place in the world now and up to 7 days in the future. It can help you decide whether to travel at that place.
In addition, there is an added feature of viewing some images of the place of your choice.
The website also stores the information you previously filled in.

# Tutorial

## Require:

> - NodeJs version > 16
> - API KEY of WeatherBit, Pixabay, Geonames

## How to run website:

1. Run: npm install or npx pnpm install
2. Create file .env.production and .env.development
3. In .env.production and .env.development ,You need to Declare the fields below:

- > WEATHERBIT_KEY= `your weatherbit API key`
- > PIXABAY_KEY= `your Pixabay API key`
- > ACCOUNNT_GEONAMES= `your geonames account`
- > PORT=1800
- > URL=localhost:1800

4. Run: npm run build-production
5. RUN: npm run start-server
6. Open website in [address](localhost:1800/)
