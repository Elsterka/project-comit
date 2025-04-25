// A simple skeleton loader for message UI — 
// shown while messages are being fetched
const MessageSkeleton = () => {
	return (
		<>
			{/* Skeleton for a received message (left-aligned) */}
			<div className='flex gap-3 items-center'>
				{/* Circular avatar skeleton */}
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
				{/* Two lines of text skeleton to represent message content */}
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
					<div className='skeleton h-4 w-40'></div>
				</div>
			</div>
			{/* Skeleton for a sent message (right-aligned) */}
			<div className='flex gap-3 items-center justify-end'>
				{/* One line of text skeleton to represent message content */}
				<div className='flex flex-col gap-1'>
					<div className='skeleton h-4 w-40'></div>
				</div>
				{/* Circular avatar skeleton */}
				<div className='skeleton w-10 h-10 rounded-full shrink-0'></div>
			</div>
		</>
	);
};
// Export the MessageSkeleton component as the default export from this file
// This allows it to be imported without curly braces in other files
export default MessageSkeleton;
