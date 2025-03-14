import React, { useEffect, useState } from "react";
import { Url, config } from "../../Url";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// State-City Mapping
const stateCityMap = {
    Gujarat: ["Surat", "Ahmedabad", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar", "Jamnagar", "Anand", "Navsari", "Mehsana", "Junagadh"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Sangli", "Jalgaon"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bhilwara", "Sikar", "Pali", "Chittorgarh"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubli", "Mangaluru", "Belagavi", "Davangere", "Ballari", "Tumakuru", "Shivamogga", "Vijayapura", "Bidar"],
    TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thoothukudi", "Dindigul", "Thanjavur"],
    UttarPradesh: ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut", "Prayagraj", "Ghaziabad", "Bareilly", "Aligarh", "Moradabad", "Gorakhpur"],
    WestBengal: ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda", "Kharagpur", "Haldia", "Raiganj", "Krishnanagar"],
    MadhyaPradesh: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Chhindwara"],
    Bihar: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia", "Begusarai", "Ara", "Katihar", "Munger", "Chapra"],
    Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Moga", "Pathankot", "Ferozepur", "Sangrur"],
    Haryana: ["Gurgaon", "Faridabad", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Bhiwani", "Rewari"],
    AndhraPradesh: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Rajahmundry", "Kadapa", "Tirupati", "Anantapur", "Eluru", "Ongole"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Siddipet", "Suryapet"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Balasore", "Puri", "Bhadrak", "Baripada", "Jeypore", "Koraput"],
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur", "Kottayam", "Malappuram", "Pathanamthitta"],
    Chhattisgarh: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Jagdalpur", "Raigarh", "Ambikapur", "Mahasamund", "Dhamtari"],
    Jharkhand: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Giridih", "Ramgarh", "Chakradharpur", "Jharia", "Medininagar"],
    Uttarakhand: ["Dehradun", "Haridwar", "Rishikesh", "Haldwani", "Nainital", "Rudrapur", "Kashipur", "Roorkee", "Pithoragarh", "Tehri", "Almora"],
    HimachalPradesh: ["Shimla", "Manali", "Dharamshala", "Kullu", "Solan", "Mandi", "Chamba", "Bilaspur", "Nahan", "Kangra", "Hamirpur"],
    Assam: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Tezpur", "Tinsukia", "Nagaon", "Bongaigaon", "Diphu", "Karimganj", "Sivasagar"],
    Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Canacona", "Curchorem", "Sanquelim", "Quepem"],
    Tripura: ["Agartala", "Dharmanagar", "Udaipur", "Ambassa", "Kailashahar", "Khowai", "Belonia", "Santirbazar", "Teliamura", "Jogendranagar"],
    Manipur: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Senapati", "Ukhrul", "Tamenglong", "Kakching", "Moreh", "Jiribam"],
    Meghalaya: ["Shillong", "Tura", "Jowai", "Nongpoh", "Baghmara", "Williamnagar", "Resubelpara", "Mairang", "Nongstoin", "Cherrapunji"],
    ArunachalPradesh: ["Itanagar", "Naharlagun", "Tawang", "Pasighat", "Ziro", "Daporijo", "Roing", "Seppa", "Tezu", "Bomdila"],
    Mizoram: ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib", "Serchhip", "Mamit", "Lawngtlai", "North Vanlaiphai", "Hnahthial"],
    Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Mon", "Wokha", "Zunheboto", "Phek", "Kiphire", "Longleng"],
    Sikkim: ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Singtam", "Rangpo", "Jorethang", "Pakyong", "Soreng", "Lachen"],
};


const Vendor = (props) => {
    const params = useParams();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        vendorName: "",
        mobileNo: "",
        state: "",
        city: "",
    });
    const [loading, setLoading] = useState(true);
    const [cities, setCities] = useState([]);

    const URL = Url + "/vendor";

    // Handle input changes
    const handleInput = (event) => {
        const { name, value } = event.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Update cities dropdown when state changes
        if (name === "state") {
            setCities(stateCityMap[value] || []);
        }
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(URL + "/", values, config);
            setValues({ vendorName: "", mobileNo: "", state: "", city: "" });
            navigate("/vendor");
            toast.success("Vendor Created Successfully");
        } catch (error) {
            console.log(error);
            setValues({ vendorName: "", mobileNo: "", state: "", city: "" });
            toast.error(error.response.data.message);
        }
    };

    // Handle update
    const handleUpdate = async (event) => {
        event.preventDefault();
        if (!params.id) return;
        try {
            const { _id, ...payload } = values;
            await axios.put(`${URL}/${params.id}`, payload, config);
            setValues({ vendorName: "", mobileNo: "", state: "", city: "" });
            navigate("/vendor");
            toast.success("Vendor Updated Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    // Fetch vendor data for editing
    const fetchData = async () => {
        try {
            if (params.id) {
                const response = await axios.get(`${URL}/${params.id}`, config);
                setValues(response.data.payload.vendorData[0]);
                // Set cities based on the state in fetched data
                setCities(stateCityMap[response.data.payload.vendorData[0].state] || []);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params.id]);

    const handleCancel = () => {
        navigate("/vendor");
    };

    let name = "";
    if (params.type === "add") {
        name = "ADD";
    } else {
        name = "UPDATE";
    }

    return (
        <>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 pb-2 border-bottom">
                    <h3 className="m-0">{name} VENDOR</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-md-6 mb-6">
                            <div className="form-group">
                                <label htmlFor="vendorName" className="required-star">
                                    Vendor Name<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="vendorName"
                                    placeholder="Enter Vendor Name"
                                    name="vendorName"
                                    required
                                    onChange={handleInput}
                                    value={values.vendorName}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mb-6">
                            <div className="form-group">
                                <label htmlFor="mobileNo" className="required-star">
                                    Mobile No.<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="mobileNo"
                                    placeholder="99XXXXXX01"
                                    name="mobileNo"
                                    maxLength="10"
                                    min="012345"
                                    onChange={handleInput}
                                    value={values.mobileNo}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mb-6">
                            <div className="form-group">
                                <label htmlFor="state" className="required-star">
                                    State<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                                </label>
                                <select
                                    className="form-control"
                                    id="state"
                                    name="state"
                                    required
                                    onChange={handleInput}
                                    value={values.state}
                                >
                                    <option value="">Select State</option>
                                    {Object.keys(stateCityMap).map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 mb-6">
                            <div className="form-group">
                                <label htmlFor="city" className="required-star">
                                    City<span style={{ color: "red", marginLeft: "3px" }}>*</span>
                                </label>
                                <select
                                    className="form-control"
                                    id="city"
                                    name="city"
                                    required
                                    onChange={handleInput}
                                    value={values.city}
                                    disabled={!values.state} // Disable city dropdown if no state is selected
                                >
                                    <option value="">Select City</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 button-group">
                        {!params.id ? (
                            <button className="btn btn-primary me-3 fw-bold" type="submit" style={{ width: "120px" }}>
                                Save
                            </button>
                        ) : (
                            <button className="btn btn-primary me-3 fw-bold" type="submit" onClick={handleUpdate} style={{ width: "120px" }}>
                                Update
                            </button>
                        )}
                        <button className="btn btn-danger fw-bold" type="button" onClick={handleCancel} style={{ width: "120px" }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
};

export default Vendor;