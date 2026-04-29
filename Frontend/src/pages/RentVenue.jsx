import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../utills/AxiosConfig";

function RentVenue() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject:"",
    message: "",
  });

  function handleInputChange(e) {
    let { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const submitComplaints = async (form) => {
    let response = await api.post("/user/complaint/addcomplaint", form);
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: submitComplaints,

    onSuccess: () => {
      toast.success("Complaints Submitted Successfully....", {
        onClose: () => {
          window.location.href = "/";
        },
      });
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    },

    onError: () => {
      toast.error("Invalid Details...", {
        onClose: () => {
          window.location.href = "/rentvenue";
        },
      });
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(form);
  }

  return (
    <>
      <div>
        <div className="page-heading-rent-venue">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Are You Looking For A Venue?</h2>
                <span>
                  Check out our venues, pick your choice and fill the
                  reservation application.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="rent-venue-tabs">
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
                              <a href="#tabs-1">Madison Square Garden</a>
                            </li>
                            <li>
                              <a href="#tabs-2">Radio City Musical Hall</a>
                            </li>
                            <li>
                              <a href="#tabs-3">Royce Hall</a>
                            </li>
                          </ul>
                        </div>
                        <div className="col-lg-4">
                          <div className="main-dark-button">
                            <a href="ticket-details.html">Purchase Tickets</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <section className="tabs-content">
                      <article id="tabs-1">
                        <div className="row">
                          <div className="col-lg-9">
                            <div className="right-content">
                              <h4>Madison Square Garden</h4>
                              <p>
                                ArtXibition Event Template is brought to you by
                                Tooplate website and it included total 7 HTML
                                pages. These are{" "}
                                <a href="index.html">Homepage</a>,{" "}
                                <a href="about.html">About</a>,
                                <a href="rent-venue.html">Rent a venue</a>,{" "}
                                <a href="shows-events.html">
                                  shows &amp; events
                                </a>
                                ,<a href="event-details.html">event details</a>,{" "}
                                <a href="tickets.html">tickets</a>, and{" "}
                                <a href="ticket-details.html">ticket details</a>
                                . You can feel free to modify any page as you
                                like. If you have any question, please visit our{" "}
                                <a
                                  href="https://www.tooplate.com/contact"
                                  target="_blank"
                                >
                                  Contact page
                                </a>
                                .
                                <br />
                                <br />
                                If you need the latest HTML templates, you may
                                visit{" "}
                                <a
                                  href="https://www.toocss.com/"
                                  target="_blank"
                                >
                                  Too CSS
                                </a>{" "}
                                website that features a great collection of
                                templates in different categories.
                              </p>
                              <ul className="list">
                                <li>Madison Square Garden</li>
                                <li>$2,840 per day</li>
                                <li>860 Guests</li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div id="map">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7405.690436500271!2d-43.289281240686606!3d-23.00173786750551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd6d13e950037%3A0x2c49dc1b12837f3f!2sPedra%20da%20G%C3%A1vea!5e1!3m2!1sen!2sth!4v1630941277488!5m2!1sen!2sth"
                                width="100%"
                                height="240px"
                                frameBorder={0}
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                              />
                              <h5>Any Question?</h5>
                              <p>
                                Tumeric air affogato sare torial waistcoat denim
                                stumber.
                              </p>
                              <div className="text-button">
                                <a href="ticket-details.html">
                                  Need Direction?{" "}
                                  <i className="fa fa-arrow-right" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                      <article id="tabs-2">
                        <div className="row">
                          <div className="col-lg-9">
                            <div className="right-content">
                              <h4>Radio City Musical Hall</h4>
                              <p>
                                {" "}
                                Aliquam tempor, purus vitae ullamcorper rhoncus,
                                quam nunc imperdiet sem, sed placerat purus dui
                                in lorem. Donec ornare at risus in varius. In at
                                magna ante. Curabitur at metus sed purus pretium
                                ullamcorper. Cras vitae sapien bibendum urna
                                pulvinar faucibus. Aliquam sed dui in orci
                                tincidunt cursus quis non tellus. Vestibulum a
                                placerat ex, ac cursus dui.
                              </p>
                              <ul className="list">
                                <li>Radio City Musical Hall</li>
                                <li>$4,750 per day</li>
                                <li>1,100 Guests</li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div id="map">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14678.414668643849!2d-43.19038460753291!3d-22.96913839717705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd54579a5956b%3A0xa102deeaffcb3e3!2sCopacabana%20Beach!5e1!3m2!1sen!2sth!4v1630941170951!5m2!1sen!2sth"
                                width="100%"
                                height="240px"
                                frameBorder={0}
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                              />
                              <h5>Any Question?</h5>
                              <p>
                                Tumeric air affogato sare torial waistcoat denim
                                stumber.
                              </p>
                              <div className="text-button">
                                <a href="ticket-details.html">
                                  Need Direction?{" "}
                                  <i className="fa fa-arrow-right" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                      <article id="tabs-3">
                        <div className="row">
                          <div className="col-lg-9">
                            <div className="right-content">
                              <h4>Royce Hall</h4>
                              <p>
                                {" "}
                                Maecenas ut pharetra felis. Interdum et
                                malesuada fames ac ante ipsum primis in
                                faucibus. Sed ut nisi quis tellus vulputate
                                posuere. Aenean consectetur quam et quam
                                fringilla, nec aliquam diam congue. Nulla dui
                                arcu, aliquam sed mattis non, euismod vitae
                                libero.{" "}
                              </p>
                              <ul className="list">
                                <li>Madison Square Garden</li>
                                <li>$5,860 per day</li>
                                <li>1,250 Guests</li>
                              </ul>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            <div id="map">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3106.724034173435!2d-43.27685374322357!3d-23.003403908758767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9bd6cbe74edde3%3A0x14e89f87adc702cc!2sMirante%20Ciclovia%20Sao%20Conrado!5e1!3m2!1sen!2sth!4v1630941324692!5m2!1sen!2sth"
                                width="100%"
                                height="240px"
                                frameBorder={0}
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                              />
                              <h5>Any Question?</h5>
                              <p>
                                Tumeric air affogato sare torial waistcoat denim
                                stumber.
                              </p>
                              <div className="text-button">
                                <a href="ticket-details.html">
                                  Need Direction?{" "}
                                  <i className="fa fa-arrow-right" />
                                </a>
                              </div>
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
        <div className="rent-venue-application">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="heading-text">
                  <h4>Reservation Application</h4>
                </div>
                <div className="contact-form">
                  <form onSubmit={handleSubmit}>
                    <div className="row" >
                      {/* Name */}
                      <div className="col-lg-12">
                        <input
                          type="text"
                          name="name"
                          placeholder="Your Name"
                          value={form.name}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="col-lg-12">
                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          value={form.email}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>

                      {/* Subject */}
                      <div className="col-lg-12">
                        <input
                          type="text"
                          name="subject"
                          placeholder="Subject"
                          value={form.subject}
                          onChange={handleInputChange}
                          className="form-control"
                          required
                        />
                      </div>

                      {/* Message */}
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          placeholder="Your Message"
                          value={form.message}
                          onChange={handleInputChange}
                          className="form-control"
                          rows="4"
                          required
                        />
                      </div>

                      {/* Button */}
                      <div className="col-lg-12">
                        <button
                        className="main-dark-button w-100"
                        type="submit"
                        disabled={mutation.isPending}
                      >
                        {mutation.isPending
                          ? "Submitting..."
                          : " Send Message"}
                      </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
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

export default RentVenue;
