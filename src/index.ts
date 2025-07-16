import { render, html } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";

type Schedule = "monthly" | "yearly";
type Plan = {
  [key in Schedule]: number;
} & {
  name: string;
  icon: string;
};
type Addon = {
  [key in Schedule]: number;
} & {
  name: string;
  description: string;
};
interface State {
  step: number;
  name?: string;
  email?: string;
  phone?: string;
  schedule: Schedule;
  plan?: Plan;
  addons: Addon[];
}
const state: State = { step: 1, schedule: "monthly", addons: [] };

function labeledInputHtml(label: string, placeholder: string, key: string) {
  function oninput(this: HTMLInputElement) {
    state[key] = this.value;
  }

  return html`
    <p class="mx-4 mt-4 font-semibold text-blue-950">${label}</p>
    <input
      class="mx-4 border rounded-sm p-2"
      type="text"
      placeholder=${placeholder}
      @oninput=${oninput}
    />
  `;
}

const pageHtml = () =>
  html` <main class="flex flex-col min-h-screen bg-blue-100">
      <section
        class="flex flex-row bg-cover bg-[url(../assets/images/bg-sidebar-mobile.svg)]"
      >
        <div class="m-auto pt-10 pb-20 text-blue-200 text-lg font-bold">
          ${[1, 2, 3, 4].map(
            n =>
              html`<span
                class="rounded-full border border-blue-200 m-4 px-3 py-2 ${classMap(
                  {
                    "bg-transparent": n !== state.step,
                    "bg-blue-200": n === state.step,
                    "text-black": n === state.step,
                  }
                )}"
                >${n}</span
              >`
          )}
        </div>
      </section>
      <section class="flex flex-col mx-4 mt-[-40px] bg-white rounded-lg">
        <h1 class="text-3xl mx-4 mt-4 font-bold text-blue-950">Personal info</h1>
        <p class="mx-4 mt-4 text-xl text-gray-500">
          Please provide your name, email address, and phone number.
        </p>
        ${labeledInputHtml("Name", "e.g. Stephen King", "name")}
        ${labeledInputHtml("Email Address", "e.g. stephenking@lorem.com", "email")}
        ${labeledInputHtml("Phone Number", "e.g. +1 234 567 890", "phone")}
        <div class="mb-4">
      </section>
      <div class="flex-grow"></div>
      <section class="bg-white p-4 flex justify-end">
        <button class="bg-blue-950 text-white px-4 py-2 rounded-md" @click=${() => {
          state.step++;
        }}>
          Next Step
        </button>
      </section>
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
window.onchange = window.onclick = window.oninput = renderBody;
renderBody();
