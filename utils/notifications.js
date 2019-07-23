/**
 * CREDIT WHERE IT IS DUE!
 * THIS LOGIC IS HEAVILY INSPIRED BY THE LOGIC IN UDACITY'S REACT NANODEGREE
 * CODE-ALONG PROJECT, UDACIFITNESS, SEE THE SOURCE AT:
 * https://github.com/udacity/reactnd-UdaciFitness-complete/blob/useLocalNotification/utils/helpers.js
 */

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native';

const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

function createNotification() {
    return {
        title: 'Take a quiz!',
        body: "I noticed you haven't take a quiz today. Take one now!",
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function clearNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync());
}

export async function setNotification() {
    const data = JSON.parse(await AsyncStorage.getItem(NOTIFICATION_KEY));

    // if a notification exists, no need to continue
    if (data) {
        return;
    }

    // if permissions granted, reset notifications to tomorrow
    const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (permission.status !== 'granted') {
        return;
    }
    Notifications.cancelAllScheduledNotificationsAsync();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(12);
    tomorrow.setMinutes(0);

    // schedule new notification at 12:00PM GMT next day
    Notifications.scheduleLocalNotificationAsync(createNotification(),
        {
            time: tomorrow,
            repeat: 'day'
        });
    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
}