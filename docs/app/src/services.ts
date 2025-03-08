import axios, { AxiosAdapter, AxiosResponse } from 'axios';
import Dexie, { Transaction } from "dexie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  function (config) {
    // config.params = { ...config.params, token: "***" };

    return config;
  },
  function (error) {
    if (error.response.status === 401) {
      window.location.href = process.env.NEXT_PUBLIC_API_URL || "/";
    }

    return Promise.reject(error);
  },
);

import GettingStarted from './markdowns/getting-started.md';
import BackendApi from './markdowns/api-restful.md';
import BackendRubyOnRails from './markdowns/backend/ruby-on-rails.md';
import BackendDjango from './markdowns/backend/django.md';
import BackendLaravel from './markdowns/backend/laravel.md';
import BackendExpress from './markdowns/backend/express.md';
import Frameworks from './markdowns/frameworks.md';
import FrameworksNextJs from './markdowns/frameworks/nextjs.md';
import FrameworkNuxt from './markdowns/frameworks/nuxt.md';
import Features from './markdowns/features.md';
import Contributing from './markdowns/contributing.md';

const defaultData = [
  {
    title: 'Getting Started',
    description: 'Poly Scaffold is a command-line tool for generating scaffold code for various frameworks.',
    content: GettingStarted,
  },
  {
    title: 'Backend',
    description: 'Using the generated code, you can create a backend API using various frameworks.',
    content: BackendApi,
  },
  {
    title: 'Backend / Ruby on Rails',
    description: 'Ruby on Rails is a web application framework written in Ruby.',
    content: BackendRubyOnRails,
  },
  {
    title: 'Backend / Django',
    description: 'Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.',
    content: BackendDjango,
  },
  {
    title: 'Backend / Laravel',
    description: 'Laravel is a web application framework with expressive, elegant syntax.',
    content: BackendLaravel,
  },
  {
    title: 'Backend / Express.js',
    description: 'Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
    content: BackendExpress,
  },
  {
    title: 'Frontend',
    description: 'Using the generated code, you can create a frontend using various frameworks.',
    content: Frameworks,
  },
  {
    title: 'Frontend / Next.js',
    description: 'Next.js is a React framework that enables server-side rendering and static site generation.',
    content: FrameworksNextJs,
  },
  {
    title: 'Frontend / Nuxt.js',
    description: 'Nuxt.js is a Vue framework that enables server-side rendering and static site generation.',
    content: FrameworkNuxt,
  },
  {
    title: 'Features',
    description: 'Poly Scaffold is a command-line tool for generating scaffold code for various frameworks.',
    content: Features,
  },
  {
    title: 'Contributing',
    description: 'Poly Scaffold is a command-line tool for generating scaffold code for various frameworks.',
    content: Contributing,
  },
];

function setupLocalDatabase() {
  const db = new Dexie('MyDatabase');

  db.version(1).stores({
    pages: '++id, title, description, content',
  })

  db.on('populate', (tx: Transaction) => {
    tx.table('pages').clear();
    tx.table('pages').bulkAdd(defaultData);
  });

  return db;
}

const dexieAdapter: AxiosAdapter = async (config) => {
  const db = setupLocalDatabase();
  const [collectionName, id] = config.url?.split('/').slice(1) || [];
  const collection = db.table(collectionName);
  const data = config.data ? JSON.parse(config.data) : {};

  let color = 'color:blue';

  switch (config.method) {
    case 'post':
      color = 'color:green';
      break;
    case 'put':
      color = 'color:orange';
      break;
    case 'delete':
      color = 'color:red';
      break;
  }

  console.debug(`%c[Dexie Axios Adapter] %c[${config.method?.toUpperCase()}]`, "font-weight:bold;color:orange", color, config.url, data);

  if (config.method === 'get') {
    if (id) {
      const page = await collection.get(Number(id));
      return new Promise<AxiosResponse>((resolve) => {
        resolve({
          data: page,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        });
      });
    } else {
      const pages = await collection.toArray();
      return new Promise<AxiosResponse>((resolve) => {
        resolve({
          data: pages,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        });
      });
    }
  }

  if (config.method === 'post') {
    const id = await collection.add(data);
    return new Promise<AxiosResponse>((resolve) => {
      resolve({
        data: { id, ...data },
        status: 201,
        statusText: 'Created',
        headers: {},
        config,
      });
    });
  }

  if (config.method === 'put') {
    const page = await collection.update(Number(id || data.id), data);
    return new Promise<AxiosResponse>((resolve) => {
      resolve({
        data: page,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      });
    });
  }

  if (config.method === 'delete') {
    await collection.delete(Number(id || data.id));
    return new Promise<AxiosResponse>((resolve) => {
      resolve({
        data: {},
        status: 204,
        statusText: 'No Content',
        headers: {},
        config,
      });
    });
  }

  return new Promise<AxiosResponse>((resolve) => {
    resolve({
      data: {},
      status: 404,
      statusText: 'OK',
      headers: {},
      config,
    });
  });
};

api.defaults.adapter = dexieAdapter;

export { api };
