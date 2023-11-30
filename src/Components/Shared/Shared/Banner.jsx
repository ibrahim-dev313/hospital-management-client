import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useAllBanners from "../../../hooks/useAllBanners";

const Banner = () => {
    // const [filteredBanner, setFileteredBanner] = useState()
    const [allBanners] = useAllBanners()
    const filtered = allBanners.find(banner => banner.isActive == true)
    // setFileteredBanner(filtered)
    // console.log(filtered);
    // console.log(allBanners);
    return (
        <div className="min-h-screen hero" style={{ backgroundImage: `url(${filtered?.bannerImage})` }}>
            <div className="bg-opacity-70 hero-overlay"></div>
            <div className="text-center hero-content text-neutral-content">
                <div className="max-w-screen">
                    <h1 className="w-2/3 mx-auto mb-5 text-6xl font-bold">{filtered?.bannerTitle}</h1>
                    <br />
                    <p className="mb-5 text-2xl font-semibold">{filtered?.bannerDescription}</p>
                    <br />
                    <div className="p-3 mb-5 bg-green-600 rounded-full join">
                        <div className="flex items-center mr-5 text-2xl join-item">

                            <p className="font-semibold">Get <span className="text-3xl font-bold"> {filtered?.couponRate}% </span> discount using Coupon Code</p>
                        </div>
                        <div className="px-4 py-3 font-bold text-white bg-green-700 border-0 rounded-full hover:bg-green-800">
                            {filtered?.couponCode}
                        </div>
                    </div>
                    <div>
                        <Link to={'alltests'} className="px-4 py-3 font-bold text-white uppercase bg-green-700 border-0 rounded-full btn btn-wide hover:bg-green-800">
                            See All Tests <FontAwesomeIcon size="xl" icon={faArrowRight} />
                        </Link>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Banner;