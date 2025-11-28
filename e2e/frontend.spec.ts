import { test, expect } from '@playwright/test';
import fs from 'fs/promises';
import path from 'path';
import config from '../playwright.config';

const BASE_URL = 'http://localhost:5050';
const RESOURCES_FILE = path.join(__dirname, '../utils/resources.json');

test.beforeAll(async () => {
  const projects: { name: string }[] = (config as any).projects ?? [];
  const browsers: string[] = projects.map((p) => p.name);

  const initialData = browsers.flatMap((browserName: string) => [
    {
      id: `kb-${browserName}`,
      name: `Keyboard-${browserName}`,
      location: 'Room 101',
      description: 'Wireless keyboard',
      owner: 'admin@example.com',
    },
    {
      id: `mn-${browserName}`,
      name: `Monitor-${browserName}`,
      location: 'Room 101',
      description: 'HP Monitor',
      owner: 'admin@example.com',
    },
    {
      id: `lt-${browserName}`,
      name: `Laptop-${browserName}`,
      location: 'Room 101',
      description: 'Dell Laptop',
      owner: 'admin@example.com',
    },
  ]);

  await fs.writeFile(RESOURCES_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  console.log('resources.json initialized for browsers:', browsers.join(', '));
});

test.describe('Resource Mgmt CRUD Frontend Tests', () => {
  test('Create Resource', async ({ page, browserName }) => {
    // Test logic here
  });
});
