import React from "react";
import api from "../utills/AxiosConfig";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useLocation } from "react-router-dom";

function ShowEvent() {
  let tag = useLocation().pathname.split("/")[2];
  const { id } = useParams();

  const fetchCategory = async () => {
    try {
      const response = await api.get("/user/category/");
      return response.data.data;
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const fetchEvent = async () => {
    try {
      const response = await api.get("/user/event/");
      return response.data.data;
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const fetchEventsByCategory = async (id) => {
    const response = await api.get(`/user/event/category/${id}`);
    return response.data.data;
  };

  const { data: categoryevent } = useQuery({
    queryKey: ["categoryevent", id],
    queryFn: () => fetchEventsByCategory(id),
    enabled: !!id,
  });

  const {
    data: events,
    isloading,
    iserror,
    Error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvent,
  });

  const {
    data: category,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });

  return (
    <>
      <div>
        <div className="page-heading-shows-events">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Our Shows &amp; Events</h2>
                <span>Check out upcoming and past shows &amp; events.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="shows-events-tabs">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="row" id="tabs">
                  <div className="col-lg-12">
                    <div className="heading-tabs">
                      <div className="row">
                        <div className="col-lg-8">
                          <ul>
                            <li>
                              <a href="#tabs-1">Upcoming</a>
                            </li>
                            <li>
                              <a href="#tabs-2">Past</a>
                            </li>
                          </ul>
                        </div>
                       
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <section className="tabs-content">
                      <article id="tabs-1">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="heading">
                              <h2>Upcoming</h2>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div className="sidebar">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="heading-sidebar">
                                    <h4>
                                      Sort The Upcoming Shows &amp; Events By:
                                    </h4>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="category">
                                    <h6>Category</h6>
                                    <ul>
                                      {isLoading ? (
                                        <p className="text-center">
                                          Loading Category...
                                        </p>
                                      ) : isError ? (
                                        <p className="text-danger text-center">
                                          {error.message}
                                        </p>
                                      ) : (
                                        category?.map((value) => (
                                          <li key={value._id}>
                                            <Link
                                              to={`/categorybyevent/${value._id}`}
                                            >
                                              {value.name}
                                            </Link>
                                          </li>
                                        ))
                                      )}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-9">
                            <div className="row">
                              {isloading ? (
                                <h4 className="text-center mt-4">
                                  Loading Events...
                                </h4>
                              ) : iserror ? (
                                <h4 className="text-danger text-center">
                                  {Error.message}
                                </h4>
                              ) : (
                                (id ? categoryevent  : events)?.map(
                                  (value, index) => (
                                    <div className="col-lg-12" key={index}>
                                      <div className="event-item">
                                        <div className="row">
                                          <div className="col-lg-4">
                                            <div className="left-content">
                                              <h4>{value.event_name}</h4>

                                              <p>
                                                Artist: {value.artist_name}{" "}
                                                <br />
                                                Price: ₹{value.price_per_seat}
                                              </p>

                                              <div className="main-dark-button">
                                                <Link
                                                  to={`/eventdetails/${value._id}`}       
                                                >
                                                  Discover More
                                                </Link>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="col-lg-4">
                                            <div className="thumb">
                                              <img
                                                style={{ height: "230px" }}
                                                src={value.event_img}
                                                alt={value.event_name}
                                              />
                                            </div>
                                          </div>

                                          <div className="col-lg-4">
                                            <div className="right-content">
                                              <ul>
                                                <li>
                                                  <i className="fa fa-clock-o" />
                                                  <h6>
                                                    {new Date(
                                                      value.datetime,
                                                    ).toLocaleDateString()}
                                                    <br />
                                                    {new Date(
                                                      value.datetime,
                                                    ).toLocaleTimeString()}
                                                  </h6>
                                                </li>

                                                <li>
                                                  <i className="fa fa-map-marker" />
                                                  <span>{value.address}</span>
                                                </li>

                                                <li>
                                                  <i className="fa fa-users" />
                                                  <span>
                                                    {value.available_seats}{" "}
                                                    Seats Available /{" "}
                                                    {value.total_seats}
                                                  </span>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ),
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowEvent;
