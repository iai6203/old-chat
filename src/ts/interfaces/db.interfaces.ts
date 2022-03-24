export interface UserInfo {
  nickname: string
}

export interface ChatRoom {
  uid: string
  title: string
  users?: []
  messages?: Message[]
}

export interface Message {
  email: string
  text: string
}
