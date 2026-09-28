export type Friend = {
  id: string;
  name: string;
  nickname?: string;
  avatar?: string;
  birthday?: string;
  location?: string;
  occupation?: string;
  personality?: string;
  relationship: string;
  lastMet?: string;
  interests: string[];
  memo?: string;
};

export const demoFriends: Friend[] = [
  {
    id: "1",
    name: "ゆきほ",
    birthday: "10/03",
    location: "埼玉",
    occupation: "大学生",
    personality: "ENFP",
    relationship: "友達",
    lastMet: "9/20",
    interests: ["カフェ", "映画", "旅行"],
    memo: "辛いものは少し苦手。ディズニーに行きたいと言っていた。"
  },
  {
    id: "2",
    name: "そら",
    birthday: "12/18",
    location: "東京",
    occupation: "Webエンジニア",
    personality: "INTP",
    relationship: "仕事・友達",
    lastMet: "8/12",
    interests: ["ゲーム", "プログラミング", "ラーメン"],
    memo: "新しいゲームを探している。"
  },
  {
    id: "3",
    name: "けんた",
    birthday: "02/14",
    location: "神奈川",
    occupation: "会社員",
    personality: "ISFJ",
    relationship: "地元",
    lastMet: "7/02",
    interests: ["サッカー", "焼肉"],
    memo: "次はスタジアム観戦。"
  }
];

export const demoMemories = [
  { id: "m1", title: "新宿で焼肉", date: "2026/09/20", people: ["ゆきほ"] },
  { id: "m2", title: "ゲーム会", date: "2026/08/12", people: ["そら", "けんた"] }
];

export const demoWishes = [
  { id: "w1", title: "ディズニーに行く", person: "ゆきほ", done: false },
  { id: "w2", title: "焼肉に行く", person: "そら", done: false },
  { id: "w3", title: "サッカー観戦", person: "けんた", done: false }
];
