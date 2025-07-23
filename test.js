/* book a call section service page */
`
<p class="text-xl m-4">
            Book a free
            <span v-if="single_service.has_demo === 1">demo</span>
            <span v-else-if="service.has_demo === 2">site visit</span>
            <span v-else-if="service.has_demo === 3">call</span>
            and see how our solution can simplify your workflow and boost
            efficiency—live and personalized.
          </p>
          <!-- button text -->
          <span class="relative z-10 hover:text-[#131f6b]"
                >{{
                  service.has_demo === 1
                    ? "BOOK A FREE DEMO"
                    : service.has_demo === 2
                    ? "BOOK A SITE VISIT"
                    : "BOOK A FREE CALL"
                }}
              </span>
`;
