import { render, html, TemplateResult } from "lit-html";

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

const thankYouIcon = html`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="80"
  height="80"
  viewBox="0 0 80 80"
>
  <g fill="none">
    <circle cx="40" cy="40" r="40" fill="#F9818E" />
    <path
      fill="#E96170"
      d="M48.464 79.167c.768-.15 1.53-.321 2.288-.515a40.04 40.04 0 0 0 3.794-1.266 40.043 40.043 0 0 0 3.657-1.63 40.046 40.046 0 0 0 12.463-9.898A40.063 40.063 0 0 0 78.3 51.89c.338-1.117.627-2.249.867-3.391L55.374 24.698a21.6 21.6 0 0 0-15.332-6.365 21.629 21.629 0 0 0-15.344 6.365c-8.486 8.489-8.486 22.205 0 30.694l23.766 23.775Z"
    />
    <path
      fill="#FFF"
      d="M40.003 18.333a21.58 21.58 0 0 1 15.31 6.351c8.471 8.471 8.471 22.158 0 30.63-8.47 8.47-22.156 8.47-30.627 0-8.47-8.472-8.47-22.159 0-30.63a21.594 21.594 0 0 1 15.317-6.35Zm9.865 15c-.316.028-.622.15-.872.344l-12.168 9.13-5.641-5.642c-1.224-1.275-3.63 1.132-2.356 2.356l6.663 6.663c.56.56 1.539.63 2.173.156l13.326-9.995c1.122-.816.43-2.993-.956-3.013a1.666 1.666 0 0 0-.17 0Z"
    />
  </g>
</svg>`;

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
  addons: Set<Addon>;
}

const stepTags = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"];

const plans: Plan[] = (() => {
  const plan = (name: string, icon: TemplateResult, monthly: number): Plan => ({
    name,
    icon,
    monthly,
    yearly: monthly * 10,
  });
  return [
    plan("Arcade", arcadeIcon, 9),
    plan("Advanced", advancedIcon, 12),
    plan("Pro", proIcon, 15),
  ];
})();

const addons: Addon[] = (() => {
  const addon = (name: string, description: string, monthly: number) => ({
    name,
    description,
    monthly,
    yearly: monthly * 10,
  });
  return [
    addon("Online service", "Access to multiplayer games", 1),
    addon("Larger storage", "Extra 1TB of cloud save", 2),
    addon("Customizable profile", "Custom theme on your profile", 2),
  ];
})();

const state: State = {
  step: 1,
  schedule: "monthly",
  addons: new Set(),
  plan: plans[0],
  ...Object.fromEntries(new URLSearchParams(window.location.search)),
};

const monthlyBilling = () => state.schedule === "monthly";

const moOrYr = () => (monthlyBilling() ? "mo" : "yr");

const mayAdvanceStep = () =>
  state.step === 1
    ? ["name", "email", "phone"].reduce((a, b) => a && !!state[b], true)
    : state.step < 5;

const total = () =>
  addons
    .filter(x => state.addons.has(x))
    .reduce((a, b) => a + b[state.schedule], state.plan[state.schedule]);

function labeledInputHtml(label: string, placeholder: string, key: string) {
  function onchange(this: HTMLInputElement) {
    state[key] = this.value;
  }
  const inputId = `input-${key}`;
  return html`
    <div class="flex flex-row justify-between">
      <label for=${inputId} class="mx-4 mt-4 font-semibold text-blue-950">${label}</label>
      ${
        state.validate_step != 1 || !!state[key]
          ? null
          : html`<span class="mx-4 mt-4 font-bold text-red-500"
              >This field is required</span
            >`
      }
      </div>
      <input
        id=${inputId}
        class="mx-4 border rounded-sm p-2"
        type="text"
        placeholder=${placeholder}
        value=${state[key] ?? ""}
        @change=${onchange}
      />
    </div>
  `;
}

const step1CardHtml = () =>
  html` <h1 class="mx-4 mt-4 text-3xl font-bold text-blue-950">
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
      class="border-grey-500 ${state.plan === plan
        ? "border-purple-600 bg-blue-100"
        : ""} mx-4 my-2 flex flex-row rounded-lg border hover:border-purple-600 md:my-4 md:flex-col"
    >
      <div class="m-4">${plan.icon}</div>
      <div class="flex flex-grow flex-col">
        <p class="mx-4 mt-4 font-semibold text-blue-950">${plan.name}</p>
        <p class="mx-4 text-gray-500">
          &dollar;${plan[state.schedule]}/${moOrYr()}
        </p>
        ${monthlyBilling() ? null : html`<p class="mx-4">2 months free</p>`}
      </div>
    </div>
  </label>`;

const billingToggle = () =>
  html` <label
    class="mx-4 my-2 flex cursor-pointer flex-row items-center justify-center rounded-lg bg-blue-100 py-4"
  >
    <p
      class="${monthlyBilling()
        ? "text-blue-950 font-semibold"
        : "text-gray-500"}"
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
      class="${monthlyBilling()
        ? ""
        : "justify-end"} mx-4 flex h-4 w-7 items-center rounded-full bg-blue-950"
    >
      <span class="h-3 w-3 rounded-full bg-white"></span>
    </div>
    <p
      class=${monthlyBilling()
        ? "text-gray-500"
        : "text-blue-950 font-semibold"}
    >
      Yearly
    </p>
  </label>`;

const step2CardHtml = () =>
  html`<div class="flex flex-col">
    <h1 class="mx-4 mt-4 text-3xl font-bold text-blue-950">Select your plan</h1>
    <p class="mx-4 mt-4 text-gray-500">
      You have the option of monthly or yearly billing.
    </p>
    <div class="flex flex-col md:grid md:grid-cols-3">
      ${plans.map(planHtml)}
    </div>
    ${billingToggle()}
  </div>`;

const addonHtml = (addon: Addon) => {
  const isSelected = state.addons.has(addon);
  return html`
    <label
      class="${isSelected
        ? "border-purple-600 bg-blue-100"
        : ""} my-2 flex cursor-pointer flex-row items-center rounded-lg border border-purple-200 p-4 hover:border-purple-600"
    >
      <input
        type="checkbox"
        class="h-5 w-5 accent-purple-600"
        .checked=${isSelected}
        @click=${() => {
          if (isSelected) {
            state.addons.delete(addon);
          } else {
            state.addons.add(addon);
          }
        }}
      />
      <div class="ml-4 flex-grow">
        <p class="font-semibold text-blue-950">${addon.name}</p>
        <p class="text-sm text-gray-500">${addon.description}</p>
      </div>
      <p class="text-purple-600">
        +&dollar;${addon[state.schedule]}/${moOrYr()}
      </p>
    </label>
  `;
};

const step3CardHtml = () =>
  html`<div class="flex flex-col">
    <h1 class="mx-4 mt-4 text-3xl font-bold text-blue-950">Pick add-ons</h1>
    <p class="mx-4 mt-4 text-gray-500">
      Add-ons help enhance your gaming experience.
    </p>
    <div class="mx-4 flex flex-col">${addons.map(addonHtml)}</div>
  </div>`;

const step4CardHtml = () =>
  html`<div class="flex flex-col">
    <h1 class="mx-4 mt-4 text-3xl font-bold text-blue-950">Finishing up</h1>
    <p class="mx-4 mt-4 text-gray-500">
      Double-check everything looks OK before confirming.
    </p>
    <div class="m-4 flex flex-col">
      <div class="flex flex-row justify-between rounded-t-lg bg-blue-100 p-4">
        <div class="flex flex-col">
          <p class="font-semibold text-blue-950">
            ${state.plan.name} (${monthlyBilling() ? "Monthly" : "Yearly"})
          </p>
          <a class="text-gray-500 underline" @click=${() => (state.step = 2)}>
            Change
          </a>
        </div>
        <span class="text-blue-950">
          &dollar;${state.plan[state.schedule]}/${moOrYr()}
        </span>
      </div>
      <div class="flex flex-row justify-between rounded-b-lg bg-blue-100 p-4">
        <div class="flex w-1/1 flex-col text-gray-500">
          ${addons
            .filter(addon => state.addons.has(addon))
            .map(
              addon =>
                html` <div class="flex w-1/1 flex-row justify-between">
                  <div>${addon.name}</div>
                  <div class="text-blue-950">
                    +&dollar;${addon[state.schedule]}/${moOrYr()}
                  </div>
                </div>`
            )}
        </div>
      </div>
      <div class="flex w-1/1 flex-row justify-between p-4">
        <div class="text-gray-500">
          Total (per ${monthlyBilling() ? "month" : "year"})
        </div>
        <div class="font-semibold text-purple-600">
          +&dollar;${total()}/${moOrYr()}
        </div>
      </div>
    </div>
  </div>`;

const step5CardHtml = () =>
  html`<div class="flex h-[40vh] flex-col items-center md:h-1/1">
    <div class="grow-1"></div>
    ${thankYouIcon}
    <h1 class="mx-4 mt-4 text-3xl font-bold text-blue-950">Thank you!</h1>
    <p class="mx-4 mt-4 text-center text-gray-500 md:w-md">
      Thanks for confirming your subscription! We hope you have fun using our
      platform. If you ever need support, please feel free to email us at
      support@loremgaming.com.
    </p>
    <div class="grow-1"></div>
  </div>`;

const stepGuideHtml = () =>
  html`<section
    class="bg-[url(../assets/images/bg-sidebar-mobile.svg)] bg-cover md:rounded-lg md:bg-[url(../assets/images/bg-sidebar-desktop.svg)] md:bg-no-repeat"
  >
    <div class="m-auto flex flex-row justify-center pt-10 pb-20 md:flex-col">
      ${[1, 2, 3, 4].map(
        n =>
          html` <div class="justify-left m-4 flex items-center gap-4">
            <span
              class="${n === state.step || (n === 4 && state.step > 4)
                ? "bg-blue-200 text-black"
                : "bg-transparent text-blue-200"} rounded-full border border-blue-200 px-4 py-2 text-lg font-bold"
            >
              ${n}
            </span>
            <span class="hidden md:block">
              <p class="text-grey-500">Step ${n}</p>
              <p class="font-bold text-purple-200">${stepTags[n - 1]}</p>
            </span>
          </div>`
      )}
    </div>
  </section>`;

const stepRenderers = [
  step1CardHtml,
  step2CardHtml,
  step3CardHtml,
  step4CardHtml,
  step5CardHtml,
];

const pageHtml = () =>
  html` <main class="min-h-screen bg-blue-100 flex flex-col justify-start md:justify-center">
  <div class="flex flex-col md:flex-row md:m-auto md:bg-white md:rounded-lg md:p-4 md:min-w-3/5">
    ${stepGuideHtml()}
    <div class="md:grow-1"></div>
    <section class="flex flex-col mx-4 mt-[-40px] md:mt-0 bg-white rounded-lg md:grow-2">
      ${stepRenderers[state.step - 1]!()}
      <div class="mb-4"></div>
      <div class="flex-grow"></div>
      ${
        state.step > 4
          ? null
          : html`<section class="flex justify-end bg-white p-4">
              ${state.step === 1
                ? null
                : html`<button
                      class="px-4 py-2 text-gray-500"
                      @click=${() => state.step--}
                    >
                      Go Back
                    </button>
                    <div class="flex-grow"></div>`}
              <button
                class="rounded-md bg-blue-950 px-4 py-2 text-white"
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

const renderBody = () => render(pageHtml(), document.body);
window.onchange = window.onclick = renderBody;
renderBody();
