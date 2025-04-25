// Importing components that make up the main layout of the Home page
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
	return (
		// Flex container that holds Sidebar and MessageContainer side-by-side
		<div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>

			{/* Sidebar component - contains chat list, profile, or navigation */}
			<Sidebar />
			{/* MessageContainer component -  displays the active chat messages */}
			<MessageContainer />
		</div>
	);
};
// Exporting the Home component so it can be used in routing or higher-level components
export default Home;
