import { Client, Account, Databases } from 'appwrite';

// export const API_ENDPOINT = ''
export const PROJECT_ID = '668a822500216ef4b9a6'
export const DATABASE_ID = '668a83ae001034f1c5bb'
export const COLLECTION_ID_MESSAGES = '668a83bf0022162b113f'


const client = new Client()

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('668a822500216ef4b9a6');   

export const account = new Account(client);
export const databases = new Databases(client)  

export default client   