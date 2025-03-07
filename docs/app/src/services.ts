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

import HomePage from 'raw-loader!./markdowns/README.md';
import Frameworks from 'raw-loader!./markdowns/frameworks.md';
import FrameworksNextJs from 'raw-loader!./markdowns/frameworks/nextjs.md';

const defaultData = [
  {
    title: 'README.md',
    description: 'Poly Scaffold is a command-line tool for generating scaffold code for various frameworks.',
    content: HomePage,
  },
  {
    title: 'frameworks.md',
    description: 'Frameworks supported by Poly Scaffold.',
    content: Frameworks,
  },
  {
    title: 'frameworks/next.md',
    description: 'Next.js is a React framework that enables server-side rendering and static site generation.',
    content: FrameworksNextJs,
  },
];

function setupLocalDatabase() {
  const db = new Dexie('MyDatabase');

  db.version(1).stores({
    pages: '++id, title, description, content',
  })

  db.on('populate', (tx: Transaction) => {
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
