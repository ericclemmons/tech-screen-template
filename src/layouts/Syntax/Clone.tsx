import { kebabCase } from "lodash";
import * as React from "react";

type Props = {
  defaultCategory?: string;
  defaultTitle?: string;
  template: string;
};

export default function Clone({
  defaultCategory = "Algorithms",
  defaultTitle = "Challenge",
  template,
}: Props) {
  const [draft, setDraft] = React.useState("");
  const [form, setForm] = React.useState<HTMLFormElement>();

  const handleChange: React.FormEventHandler<HTMLFormElement> =
    React.useCallback(
      (event) => {
        const data = new FormData(form);

        setDraft(
          `/src/pages/${kebabCase(data.get("category") as string) || "?"}/${
            kebabCase(data.get("title") as string) || "?"
          }/...`
        );
      },
      [form]
    );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> =
    React.useCallback(
      (event) => {
        const data = new FormData(form);

        // While form is submitting, replace the URL with the new draft path.
        // Otherwise, Astro may see the FS change and reload the template page.
        setTimeout(() => {
          window.history.replaceState(
            null,
            "",
            `/${kebabCase(data.get("category") as string)}/${kebabCase(
              data.get("title") as string
            )}`
          );
        }, 0);
      },
      [form]
    );

  return (
    <>
      <label
        htmlFor="clone-modal"
        className="btn btn-xs btn-outline btn-secondary"
      >
        Clone
      </label>

      <input type="checkbox" id="clone-modal" className="modal-toggle" />

      <div className="modal modal-bottom sm:modal-middle">
        <main className="modal-box prose sm:w-4/5 max-w-none">
          <form
            action="/templates/clone"
            className="flex flex-col gap-4 font-display"
            onChange={handleChange}
            ref={(form: HTMLFormElement) => setForm(form)}
            onSubmit={handleSubmit}
          >
            <input name="template" type="hidden" value={template} />

            <label>
              <span className="leading-loose">Category</span>
              <input
                className="w-full input input-bordered"
                name="category"
                placeholder={`e.g. ${defaultCategory}, Company, Framework`}
                required
                type="text"
              />
            </label>
            <label>
              <span className="leading-loose">Challege Title</span>
              <input
                className="w-full input input-bordered"
                name="title"
                placeholder={`e.g. ${defaultTitle}, Calendar, String Sorter`}
                required
                type="text"
              />
            </label>

            <footer className="modal-action justify-between">
              <button
                disabled={!form?.checkValidity()}
                className="btn"
                type="submit"
              >
                Create
                {draft && (
                  <>
                    &nbsp;
                    <code className="text-inherit normal-case">{draft}</code>
                  </>
                )}
              </button>
              <label htmlFor="clone-modal" className="btn btn-ghost btn-md">
                Close
              </label>
            </footer>
          </form>
        </main>
      </div>
    </>
  );
}
