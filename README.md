## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5000](http://localhost:5000) with your browser to see the result.

## How I tackled the project

Project Structure: Feature-Sliced Design
  - Advantages: It is very comfortable in scalability, making the project more understandable and structured in the face of ever-changing business requirements.

CSS styling: SCSS
  I actively used the advantages of SCSS by defining all the constants frequently used like colors, fonts, spacing, etc.

Custom Hooks:
  I defined the functionalities like sorting, fetching data from backend, etc as Custom Hooks so that it can be reused anywhere else across the application and it is much more readable and understandable for developers and clean codebase.

## An issue I found on the backend

After the database has been updated (in this case, the mockup database is contacts.json), it doesn't fetch the most recently updated data upon getContacts request...

const rawdata = fs.readFileSync(__dirname + '/contacts.json');
// const contacts = JSON.parse(rawdata);

const getContacts = () => {
  try {
    return JSON.parse(rawdata);
  } catch (e) {
    return [];
  }
};


I think it should be changed like the following...

// const contacts = JSON.parse(rawdata);

const getContacts = () => {
  try {
    const rawdata = fs.readFileSync(__dirname + '/contacts.json');
    return JSON.parse(rawdata);
  } catch (e) {
    return [];
  }
};