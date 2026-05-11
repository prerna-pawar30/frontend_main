  {/* FAQ */}
      {/* <section className="pb-0 text-center relative" data-aos="fade-up">
        <div className="relative mx-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-black">
            Quick <span className="text-[#E68736]">Assistance</span>
          </h2>
          <p className="text-black/70 mb-10">Quick Answers To Your Questions</p>

          <div className="faq-box mx-auto space-y-4 bg-[#F7E6DC] p-6  ">
            {[
              {
                q: "Where To Get Dental Implants?",
                a: "Dental implants, abutments and other components can be ordered from this site or contact us.",
              },
              {
                q: "How Much Dental Implants Cost?",
                a: "Pricing varies based on components selected. Please contact us for a quote.",
              },
              {
                q: "Which Dental Implant Manufacturer is Better?",
                a: "We work with leading manufacturers to ensure quality and precision.",
              },
              {
                q: "How Do I Contact With You?",
                a: "You can reach us via the contact form, email, or phone.",
              },
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div
                  key={idx}
                  className="p-5 md:p-6 rounded-xl cursor-pointer border-b border-black/20"
                  data-aos="fade-up"
                  data-aos-delay={idx * 80}
                >
               
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center text-left font-semibold text-[20px] text-black"
                  >
                    {faq.q}

                  
                    <i
                      className={`bi ${
                        isOpen ? "bi-chevron-up" : "bi-chevron-down"
                      } text-3xl text-black transition-all`}
                    ></i>
                  </button>

                
                  {isOpen && (
                    <p className="mt-4 text-[18px] text-black/80 leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section> */}