import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utills/AxiosConfig";
import { useQuery } from "@tanstack/react-query";
import CheckRole from "../utills/CheckRole";
import { LogoutwithoutNotification } from "../utills/Logout";

function Home() {
  let [user, setUser] = useState({});

  async function FetchUser() {
    if (CheckRole() === "user") {
      try {
        let response = await api.get("/user/profilehome");

        console.log(response);

        setUser(response.data.user);
      } catch (e) {
        console.log(e);
        if (e.response.status == 401 && e.response.status == 403) {
          LogoutwithoutNotification();
        }
      }
    } else  {
      LogoutwithoutNotification();
    }
  }
  useEffect(() => {
    FetchUser();
  }, []);
  const fetchEvent = async () => {
    try {
      const response = await api.get("/user/event/");
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await api.get("/user/category/");
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvent,
  });

  const {
    data: category,
    isloading,
    iserror,
    Error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });

  return (
    <>
      <div>
        {/* ***** Main Banner Area Start ***** */}
        <div className="main-banner">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-content">
                  <h6>Opening on Thursday, May 15st</h6>
                  <h2>The Sunny Hill Festival 2026</h2>
                  <div className="main-white-button">
                    <Link to="/showevent">Purchase Tickets</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ***** Main Banner Area End ***** */}
        {/* *** Owl Carousel Items ****/}
        <div className="show-events-carousel">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="owl-show-events owl-carousel">
                  <div className="item">
                    <Link to="/eventdetails">
                      <img src="assets/images/show-events-01.jpg" alt />
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="/eventdetails">
                      <img src="assets/images/show-events-02.jpg" alt />
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="/eventdetails">
                      <img src="assets/images/show-events-03.jpg" alt />
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="/eventdetails">
                      <img src="assets/images/show-events-04.jpg" alt />
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="/eventdetails">
                      <img src="assets/images/show-events-01.jpg" alt />
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="/eventdetails">
                      <img src="assets/images/show-events-02.jpg" alt />
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="/eventdetails">
                      <img src="assets/images/show-events-03.jpg" alt />
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="/eventdetails">
                      <img src="assets/images/show-events-04.jpg" alt />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* *** Amazing Venus ****/}
        <div className="amazing-venues">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="left-content">
                  <h4>Three Amazing Venues for events</h4>
                  <p>
                    ArtXibition Event Template is brought to you by Tooplate
                    website and it included total 7 HTML pages. These are{" "}
                    <Link to="/">Homepage</Link>, <Link to="/about">About</Link>
                    ,<Link to="/rentvenue">Rent a venue</Link>,{" "}
                    <Link to="showevent">shows &amp; events</Link>,
                    <Link to="/eventdetails">event details</Link>,{" "}
                    <Link to="ticket">tickets</Link>, and{" "}
                    <Link to="/ticketdetails">ticket details</Link>. You can
                    feel free to modify any page as you like. If you have any
                    question, please visit our{" "}
                    <a href="https://www.tooplate.com/contact" target="_blank">
                      Contact page
                    </a>
                    .
                  </p>
                  <br />
                  <p>
                    You can use this event template for your commercial or
                    business website. You are not permitted to redistribute this
                    template ZIP file on any template download website. If you
                    need the latest HTML templates, you may visit{" "}
                    <a href="https://www.toocss.com/" target="_blank">
                      Too CSS
                    </a>{" "}
                    website that features a great collection of templates in
                    different categories.
                  </p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="right-content">
                  <h5>
                    <i className="fa fa-map-marker" /> Visit Us
                  </h5>
                  <span>
                    5 College St NW, <br />
                    Norcross, GA 30071
                    <br />
                    United States
                  </span>
                  <div className="text-button">
                    <Link to="/showevent">
                      Need Directions? <i className="fa fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* *** Map ****/}
        <div className="map-image">
          <img src="assets/images/map-image.jpg" alt="Maps of 3 Venues" />
        </div>
        {/* *** Venues & Tickets ****/}
        <div className="venue-tickets">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-heading">
                  <h2>Our Venues & Tickets</h2>
                </div>
              </div>

              {isLoading ? (
                <h4 className="text-center mt-4">Loading Events...</h4>
              ) : isError ? (
                <h4 className="text-danger text-center">{error.message}</h4>
              ) : (
                events?.slice(0,3).map((value, index) => (
                  <div className="col-lg-4" key={index}>
                    <div className="venue-item">
                  
                      <div className="thumb" style={{ height: "280px" }}>
                        <img src={value.event_img} alt={value.event_name} />
                      </div>

                      <div className="down-content">
                        <div className="left-content">
                          <div className="main-white-button">
                            <Link to={`/eventdetails/${value._id}`}>
                              Purchase Tickets
                            </Link>
                          </div>
                        </div>

                        <div className="right-content">
                     
                          <h4>{value.event_name}</h4>

                       
                          <p>
                            <strong>Artist:</strong> {value.artist_name}
                          </p>

                    
                          <p>
                            <strong>Location:</strong> {value.address}
                          </p>

           
                          <p>
                            <strong>Date:</strong> {value.datetime}
                          </p>

                          <ul>
                            <li>
                              <i className="fa fa-sitemap" />
                              Total: {value.total_seats}
                            </li>
                            <li>
                              <i className="fa fa-user" />
                              Available: {value.available_seats}
                            </li>
                          </ul>

                          <div className="d-flex align-items-center justify-content-evenly mt-3">
                        
                            <div className="price pe-3">
                              <span>
                                1 ticket <br />
                                from <em>₹{value.price_per_seat}</em>
                              </span>
                            </div>

                            {/* ✅ Divider Line */}
                            <div
                              className="border-start mx-3"
                              style={{ height: "60px" }}
                            ></div>

                            {/* ✅ Artist Image */}
                            <div>
                              <img
                                src={value.artist_image}
                                alt={value.artist_name}
                                style={{
                                  width: "80px",
                                  height: "80px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* *** Coming Events ****/}
        <div className="coming-events">
          <div className="left-button">
            <div className="main-white-button">
              <Link to="/showevent">Discover More</Link>
            </div>
          </div>
          <div className="container">
            <div className="row">
              {isloading ? (
                <h4 className="text-center mt-4">Loading Events...</h4>
              ) : iserror ? (
                <h4 className="text-danger text-center">{Error.message}</h4>
              ) : (
                category?.slice(0,3).map((value, index) => (
                  <div className="col-lg-4" key={index}>
                    <div className="event-item">
                      <div className="thumb">
                        <Link to="/eventdetails">
                          <img
                            style={{ height: "280px" }}
                            src={value.image}
                            alt={value.name}
                          />
                        </Link>
                      </div>
                      <div className="down-content">
                        <Link to="/eventdetails">
                          <h4>{value.name}</h4>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {/* *** Subscribe *** */}
        <div className="subscribe">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <h4>Subscribe Our Newsletter:</h4>
              </div>
              <div className="col-lg-8">
                <form id="subscribe" action method="get">
                  <div className="row">
                    <div className="col-lg-9">
                      <fieldset>
                        <input
                          name="email"
                          type="text"
                          id="email"
                          pattern="[^ @]*@[^ @]*"
                          placeholder="Your Email Address"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-3">
                      <fieldset>
                        <button
                          type="submit"
                          id="form-submit"
                          className="main-dark-button"
                        >
                          Submit
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
