import Airtable from 'airtable';

const base = new Airtable({
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
}).base('appUcjUVkCCkgJJcl');

export default base;
