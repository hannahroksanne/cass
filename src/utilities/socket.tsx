import * as React from "react"
import { createContextHook } from "../utilities/createContextHook"
import { useSettings } from "./settings"

type SocketContextT = {}

const socket = new WebSocket("ws://127.0.0.1:19283")

const contextCreator = () => {
  const settings = useSettings()
  const [socketId, setSocketId] = React.useState()

  const handleIndexingStarted = (data) => {}

  const handleIndexingCompleted = (data) => {}

  const handleFoldersUpdate = (data) => {
    console.log("handleFoldersUpdate", data)
    settings.setFolders(data.folders)
  }

  const handleIdAssgnment = (data) => {
    setSocketId(data.id)
  }

  const socketHadlers = {
    foldersUpdate: handleFoldersUpdate,
    folderIndexingCompleted: handleIndexingCompleted,
    folderIndexingStartd: handleIndexingStarted,
    idAssignment: handleIdAssgnment,
  }

  React.useEffect(() => {
    socket.addEventListener("error", (error) => {
      console.log("SOCKET ERROR: ", error)
    })

    socket.addEventListener("open", () => {
      console.log("SOCKET OPENED")
    })

    socket.addEventListener("message", (event) => {
      const { messageType, ...data } = JSON.parse(event.data)
      const handler = socketHadlers[messageType]
      console.log("SOCKET MESSAGE: ", messageType, data)
      handler(data)
    })
  }, [])
  return {}
}

export const [SocketPovider, useSocket] = createContextHook<SocketContextT>(contextCreator)
