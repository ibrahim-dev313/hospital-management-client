import FeaturedTestCard from '../../Components/Home/FeaturedTests';
import Recommendations from '../../Components/Home/Recommendations';
import Banner from '../../Components/Shared/Shared/Banner';
import { pageTitle } from '../../Functions/DynamicTitle';

const Home = () => {
    pageTitle("Home")

    return (
        <div>
            <Banner />
            <FeaturedTestCard></FeaturedTestCard>
            <Recommendations></Recommendations>
        </div>
    );
};

export default Home;