import { render, html, TemplateResult } from "lit-html";
import advancedUrl from "url:../assets/images/icon-advanced.svg";
import arcadeUrl from "url:../assets/images/icon-arcade.svg";
import proUrl from "url:../assets/images/icon-pro.svg";
import thankYouUrl from "url:../assets/images/icon-thank-you.svg";

// Types

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

// Model

const stepTags = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"];

const plans: Plan[] = (() => {
  const plan = (name: string, icon: TemplateResult, monthly: number): Plan => ({
    name,
    icon,
    monthly,
    yearly: monthly * 10,
  });
  return [
    plan("Arcade", html`<img src="${arcadeUrl}" alt="Arcade" />`, 9),
    plan("Advanced", html`<img src="${advancedUrl}" alt="Advanced" />`, 12),
    plan("Pro", html`<img src="${proUrl}" alt="Pro" />`, 15),
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

// View

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
    <img src=${thankYouUrl} alt="Thank you" />
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
                class="${state.step === 4
                  ? "bg-purple-600"
                  : "bg-blue-950"} rounded-md px-4 py-2 text-white"
                @click=${() => {
                  state.validate_step = state.step;
                  if (mayAdvanceStep()) {
                    state.step++;
                  }
                }}
              >
                ${state.step === 4 ? "Confirm" : "Next Step"}
              </button>
            </section>`
      }
    </section>
    <div class="md:grow-1"></div>
  </main>`;

const renderBody = () => render(pageHtml(), document.body);
window.onchange = window.onclick = renderBody;
renderBody();
