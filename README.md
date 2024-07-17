# To-Do List App

A simple mobile application for managing a to-do list built with React Native/Expo, Redux, and AsyncStorage.

## Features

- Create a new to-do item
- View all to-do items
- View details of a specific to-do item
- Update a to-do item
- Delete a to-do item

## Technologies Used

- React Native
- Expo - React native framework
- Redux
- React Navigation
- AsyncStorage

## Requirements

- Node.js (v14 or later)
- npm or yarn
- Android Studio (for Android) or Xcode (for iOS)
  
## Folder Structure Library

The important folders are located in the `root` directory. These include:

- `components`: Reusable UI components.
- `screens`: Higher-level layout components for app structures.
- `navigations`: Define the Route for each screen
- `store`: Redux state management related files.
  

## Setup Instructions

1. git clone https://github.com/Duruwilly/React-native-todo-task.git
cd todo-app
1. Install the dependencies using `yarn install`.
2. Run the app with `yarn start` then a or i for the various devices.

## Running the application on a physical device

1. iOS.
   download the expo go app from app store
   login or create an account on expo
   scan the bar code using the phone camery which will prompt you to open the expo go app that was installed previously
2. Android.
   download the expo go app from play store\
   login or create an account on expo
   scan the bar code using the expo go scanner

## How the app works

After creating a to-do item, it appears on the first card.
To update a specific item, click on the pen icon.
To delete a specific item, click on the delete icon.
To View a specific item, click on the title or any area of the item.
