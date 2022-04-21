import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';

const getToken = async (type) => {
    if (type === 'access' || type === 'refresh') {
        return await getItemAsync(type);
    }
};

const setToken = async (type, token) => {
    if (type === 'access' || type === 'refresh') {
        await setItemAsync(type, token);
    }
};

const deleteToken = async (type) => {
    if (type === 'access' || type === 'refresh') {
        await deleteItemAsync(type);
    }
};

export { getToken, setToken, deleteToken };
