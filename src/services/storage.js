import AsyncStorage from '@react-native-async-storage/async-storage'

export const storage = {
    set: (key, value) => AsyncStorage.setItem(key, value),
    get: async  key => await  AsyncStorage.getItem(key),
    remove: async key => await AsyncStorage.removeItem(key),
    
};