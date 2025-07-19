import { render, html, TemplateResult } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";

const arcadeIcon = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="40"
  height="40"
  viewBox="0 0 40 40"
>
  <g fill="none" fill-rule="evenodd">
    <circle cx="20" cy="20" r="20" fill="#FFAF7E" />
    <path
      fill="#FFF"
      fill-rule="nonzero"
      d="M24.995 18.005h-3.998v5.998h-2v-5.998H15a1 1 0 0 0-1 1V29a1 1 0 0 0 1 1h9.995a1 1 0 0 0 1-1v-9.995a1 1 0 0 0-1-1Zm-5.997 8.996h-2v-1.999h2v2Zm2-11.175a2.999 2.999 0 1 0-2 0v2.18h2v-2.18Z"
    />
  </g>
</svg>`;

const advancedIcon = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="40"
  height="40"
  viewBox="0 0 40 40"
>
  <g fill="none" fill-rule="evenodd">
    <circle cx="20" cy="20" r="20" fill="#F9818E" />
    <path
      fill="#FFF"
      fill-rule="nonzero"
      d="M25.057 15H14.944C12.212 15 10 17.03 10 19.885c0 2.857 2.212 4.936 4.944 4.936h10.113c2.733 0 4.943-2.08 4.943-4.936S27.79 15 25.057 15ZM17.5 20.388c0 .12-.108.237-.234.237h-1.552v1.569c0 .126-.138.217-.259.217H14.5c-.118 0-.213-.086-.213-.203v-1.583h-1.569c-.126 0-.217-.139-.217-.26v-.956c0-.117.086-.213.202-.213h1.584v-1.554c0-.125.082-.231.203-.231h.989c.12 0 .236.108.236.234v1.551h1.555c.125 0 .231.083.231.204v.988Zm5.347.393a.862.862 0 0 1-.869-.855c0-.472.39-.856.869-.856.481 0 .87.384.87.856 0 .471-.389.855-.87.855Zm1.9 1.866a.86.86 0 0 1-.87-.852.86.86 0 0 1 .87-.855c.48 0 .87.38.87.855a.86.86 0 0 1-.87.852Zm0-3.736a.862.862 0 0 1-.87-.854c0-.472.39-.856.87-.856s.87.384.87.856a.862.862 0 0 1-.87.854Zm1.899 1.87a.862.862 0 0 1-.868-.855c0-.472.389-.856.868-.856s.868.384.868.856a.862.862 0 0 1-.868.855Z"
    />
  </g>
</svg>`;

const proIcon = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="40"
  height="40"
  viewBox="0 0 40 40"
>
  <g fill="none" fill-rule="evenodd">
    <circle cx="20" cy="20" r="20" fill="#483EFF" />
    <path
      fill="#FFF"
      fill-rule="nonzero"
      d="M26.666 13H13.334A3.333 3.333 0 0 0 10 16.333v7.193a3.447 3.447 0 0 0 2.14 3.24c1.238.5 2.656.182 3.56-.8L18.52 23h2.96l2.82 2.966a3.2 3.2 0 0 0 3.56.8 3.447 3.447 0 0 0 2.14-3.24v-7.193A3.333 3.333 0 0 0 26.666 13Zm-9.333 6H16v1.333a.667.667 0 0 1-1.333 0V19h-1.333a.667.667 0 0 1 0-1.334h1.333v-1.333a.667.667 0 1 1 1.333 0v1.333h1.333a.667.667 0 1 1 0 1.334Zm7.333 2a2.667 2.667 0 1 1 0-5.333 2.667 2.667 0 0 1 0 5.333ZM26 18.333a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z"
    />
  </g>
</svg>`;

const stepTags = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"];

type Schedule = "monthly" | "yearly";
type Plan = {
  [key in Schedule]: number;
} & {
  name: string;
  icon: TemplateResult;
};
type Addon = {
  [key in Schedule]: number;
} & {
  name: string;
  description: string;
};
interface State {
  step: number;
  validate_step?: number;
  name?: string;
  email?: string;
  phone?: string;
  schedule: Schedule;
  plan: Plan;
  addons: Addon[];
}

const plans: Plan[] = [
  {
    name: "Arcade",
    icon: arcadeIcon,
    monthly: 9,
    yearly: 90,
  },
  {
    name: "Advanced",
    icon: advancedIcon,
    monthly: 12,
    yearly: 120,
  },
  {
    name: "Pro",
    icon: proIcon,
    monthly: 15,
    yearly: 150,
  },
];

const state: State = {
  step: 1,
  schedule: "monthly",
  addons: [],
  plan: plans[0],
  ...Object.fromEntries(new URLSearchParams(window.location.search)),
};

const monthlyBilling = () => state.schedule === "monthly";

const mayAdvanceStep = () =>
  state.step === 1
    ? ["name", "email", "phone"].reduce((a, b) => a && !!state[b], true)
    : state.step < 5;

function labeledInputHtml(label: string, placeholder: string, key: string) {
  return html`
    <div class="flex flex-row justify-between">
      <span class="mx-4 mt-4 font-semibold text-blue-950">${label}</span>
      ${
        state.validate_step != 1 || !!state[key]
          ? null
          : html`<span class="mx-4 mt-4 font-bold text-red-500"
              >This field is required</span
            >`
      }
      </div>
      <input
        class="mx-4 border rounded-sm p-2"
        type="text"
        placeholder=${placeholder}
        value=${state[key] ?? ""}
        @change=${e => (state[key] = e.target.value)}
      />
    </div>
  `;
}

const step1CardHtml = () =>
  html` <h1 class="text-3xl mx-4 mt-4 font-bold text-blue-950">
      Personal info
    </h1>
    <p class="mx-4 mt-4 text-xl text-gray-500">
      Please provide your name, email address, and phone number.
    </p>
    ${labeledInputHtml("Name", "e.g. Stephen King", "name")}
    ${labeledInputHtml("Email Address", "e.g. stephenking@lorem.com", "email")}
    ${labeledInputHtml("Phone Number", "e.g. +1 234 567 890", "phone")}`;

const planHtml = (plan: Plan) =>
  html`<label class="cursor-pointer">
    <input
      type="radio"
      name="plan"
      class="sr-only"
      .checked=${state.plan === plan}
      @click=${() => (state.plan = plan)}
    />
    <div
      class="mx-4 my-2 md:my-4 border rounded-lg flex flex-row md:flex-col border-grey-500 hover:border-purple-600 ${classMap(
        {
          "border-purple-600": state.plan === plan,
          "bg-blue-100": state.plan === plan,
        }
      )}"
    >
      <div class="m-4">${plan.icon}</div>
      <div class="flex flex-grow flex-col">
        <p class="mx-4 mt-4 font-semibold text-blue-950">${plan.name}</p>
        <p class="mx-4 text-gray-500">
          &dollar;${plan[state.schedule]}/${monthlyBilling() ? "mo" : "yr"}
        </p>
        ${monthlyBilling() ? null : html`<p class="mx-4">2 months free</p>`}
      </div>
    </div>
  </label>`;

const billingToggle = () =>
  html` <label
    class="mx-4 my-2 py-4 bg-blue-100 rounded-lg flex flex-row justify-center items-center cursor-pointer"
  >
    <p
      class="mx-4 ${classMap({
        "text-blue-950": monthlyBilling(),
        "font-semibold": monthlyBilling(),
        "text-gray-500": !monthlyBilling(),
      })}"
    >
      Monthly
    </p>
    <!-- SR-only input with label for accessiblity -->
    <input
      type="checkbox"
      class="sr-only"
      .checked=${!monthlyBilling()}
      @click=${() => (state.schedule = monthlyBilling() ? "yearly" : "monthly")}
    />
    <div
      class="flex items-center w-7 h-4 bg-blue-950 rounded-full mx-4 ${classMap(
        { "justify-end": !monthlyBilling() }
      )}"
    >
      <span class="w-3 h-3 bg-white rounded-full"></span>
    </div>
    <p
      class="mx-4 ${classMap({
        "text-blue-950": !monthlyBilling(),
        "font-semibold": !monthlyBilling(),
        "text-gray-500": monthlyBilling(),
      })}"
    >
      Yearly
    </p>
  </label>`;

const step2CardHtml = () =>
  html`<div class="flex flex-col">
    <h1 class="text-3xl mx-4 mt-4 font-bold text-blue-950">Select your plan</h1>
    <p class="mx-4 mt-4 text-gray-500">
      You have the option of monthly or yearly billing.
    </p>
    <div class="flex flex-col md:grid md:grid-cols-3">
      ${plans.map(planHtml)}
    </div>
    ${billingToggle()}
  </div>`;

const step3CardHtml = () =>
  html`<h1 class="text-3xl mx-4 mt-4 font-bold text-blue-950">
    Pick add-ons
  </h1>`;

const step4CardHtml = () =>
  html`<h1 class="text-3xl mx-4 mt-4 font-bold text-blue-950">
    Finishing up
  </h1> `;

const step5CardHtml = () =>
  html`<h1 class="text-3xl mx-4 mt-4 font-bold text-blue-950">Thank you!</h1>
    <p class="mx-4 mt-4 text-xl text-gray-500">
      Thanks for confirming your subscription! We hope you have fun using our
      platform. If you ever need support, please feel free to email us at
      support@loremgaming.com.
    </p>`;

const stepRenderers = [
  null,
  step1CardHtml,
  step2CardHtml,
  step3CardHtml,
  step4CardHtml,
  step5CardHtml,
];

const pageHtml = () =>
  html` <main class="min-h-screen bg-blue-100 flex flex-col justify-start md:justify-center">
  <div class="flex flex-col md:flex-row md:m-auto md:bg-white md:rounded-lg md:p-4 md:min-w-3/5">
    <section
      class="bg-cover md:bg-no-repeat bg-[url(../assets/images/bg-sidebar-mobile.svg)] md:bg-[url(../assets/images/bg-sidebar-desktop.svg)] md:rounded-lg"
    >
      <div class="m-auto pt-10 pb-20 flex flex-row md:flex-col justify-center">
        ${[1, 2, 3, 4].map(
          n =>
            html` <div class="m-4 flex justify-left items-center gap-4">
              <span
                class="text-lg font-bold rounded-full border border-blue-200 px-4 py-2${classMap(
                  {
                    "bg-transparent": n !== state.step && state.step < 5,
                    "bg-blue-200":
                      n === state.step || (n === 4 && state.step > 4),
                    "text-black":
                      n === state.step || (n === 4 && state.step > 4),
                    "text-blue-200": n !== state.step && state.step < 5,
                  }
                )}"
              >
                ${n}
              </span>
              <span class="hidden md:block">
                <p class="text-grey-500">Step ${n}</p>
                <p class="text-purple-200 font-bold">${stepTags[n - 1]}</p>
              </span>
            </div>`
        )}
      </div>
    </section>
    <div class="md:grow-1"></div>
    <section class="flex flex-col mx-4 mt-[-40px] md:mt-0 bg-white rounded-lg md:grow-2">
      ${stepRenderers[state.step]!()}
      <div class="mb-4"></div>
      <div class="flex-grow"></div>
      ${
        state.step > 4
          ? null
          : html`<section class="bg-white p-4 flex justify-end">
              ${state.step === 1
                ? null
                : html`<button
                      class="px-4 py-2 font-semibold"
                      @click=${() => state.step--}
                    >
                      Go Back
                    </button>
                    <div class="flex-grow"></div>`}
              <button
                class="bg-blue-950 text-white px-4 py-2 rounded-md"
                @click=${() => {
                  state.validate_step = state.step;
                  if (mayAdvanceStep()) {
                    state.step++;
                  }
                }}
              >
                Next Step
              </button>
            </section>`
      }
    </section>
    <div class="md:grow-1"></div>
  </main>`;

const page = html`
  <!-- Sidebar start -->

  Step 1 Your info Step 2 Select plan Step 3 Add-ons Step 4 Summary

  <!-- Sidebar end -->

  <!-- Step 1 start -->

  Personal info Please provide your name, email address, and phone number. Name
  e.g. Stephen King Email Address e.g. stephenking@lorem.com Phone Number e.g.
  +1 234 567 890 Next Step

  <!-- Step 1 end -->

  <!-- Step 2 start -->

  Select your plan You have the option of monthly or yearly billing. Arcade
  $9/mo Advanced $12/mo Pro $15/mo Monthly Yearly Go Back Next Step

  <!-- Step 2 end -->

  <!-- Step 3 start -->

  Pick add-ons Add-ons help enhance your gaming experience. Online service
  Access to multiplayer games +$1/mo Larger storage Extra 1TB of cloud save
  +$2/mo Customizable Profile Custom theme on your profile +$2/mo Go Back Next
  Step

  <!-- Step 3 end -->

  <!-- Step 4 start -->

  Finishing up Double-check everything looks OK before confirming.

  <!-- Dynamically add subscription and add-on selections here -->

  Total (per month/year) Go Back Confirm

  <!-- Step 4 end -->

  <!-- Step 5 start -->

  Thank you! Thanks for confirming your subscription! We hope you have fun using
  our platform. If you ever need support, please feel free to email us at
  support@loremgaming.com.

  <!-- Step 5 end -->
`;

const renderBody = () => render(pageHtml(), document.body);
window.onchange = window.onclick = renderBody;
renderBody();
