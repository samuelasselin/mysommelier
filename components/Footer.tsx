import {useTranslation} from "react-i18next";

export default function Footer() {
    const { t } = useTranslation();

    return (
    <footer className="text-center h-16 sm:h-20 w-full sm:pt-2 pt-4 border-t mt-5 flex sm:flex-row flex-col justify-between items-center px-3 space-y-3 sm:mb-0 mb-3">
      <div>
        {t('createdBy')}{' '}
        <a
          href="https://platform.openai.com/docs/models"
          target="_blank"
          rel="noreferrer"
          className="font-bold hover:underline transition underline-offset-2"
        >
          ILC technology
        </a>
      </div>
    </footer>
  );
}
