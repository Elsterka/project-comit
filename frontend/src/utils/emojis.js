export const funEmojis = [
	"👾",
	"⭐",
	"🌟",
	"🎉",
	"🎊",
	"🎈",
	"🎁",
	"🎂",
	"🎄",
	"🎃",
	"🎗",
	"🎟",
	"🎫",
	"🎖",
	"🏆",
	"🏅",
	"🥇",
	"🥈",
	"🥉",
	"⚽",
	"🏀",
	"🏈",
	"⚾",
	"🎾",
	"🏐",
	"🏉",
	"🎱",
	"🏓",
	"🏸",
	"🥅",
	"🏒",
	"🏑",
	"🏏",
	"⛳",
	"🏹",
	"🎣",
	"🥊",
	"🥋",
	"🎽",
	"⛸",
	"🥌",
	"🛷",
	"🎿",
	"⛷",
	"🏂",
	"🏋️",
	"🤼",
	"🤸",
	"🤺",
	"⛹️",
	"🤾",
	"🏌️",
	"🏇",
	"🧘",
];
// Function to return a random emoji from the funEmojis array
export const getRandomEmoji = () => {
	// Math.random() generates a number between 0 and 1 (e.g., 0.345)
	// Multiplying by funEmojis.length gives a number between 0 and the last index
	// Math.floor() rounds it down to ensure it's a valid index

	return funEmojis[Math.floor(Math.random() * funEmojis.length)];
	// return funEmojis - Return the emoji at the random index
};
