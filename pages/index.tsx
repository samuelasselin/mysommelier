import type {NextPage} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {useRef, useState} from 'react';
import {Toaster, toast} from 'react-hot-toast';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LoadingDots from '../components/LoadingDots';
import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
} from 'eventsource-parser';
import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";

export const Home: NextPage = () => {
    const {t} = useTranslation();
    const {locale} = useRouter();

    const [loading, setLoading] = useState(false);
    const [wineName, setWineName] = useState('Carpineto Brunello-di-Montalcino 2018');
    const [generatedBios, setGeneratedBios] = useState<String>('');

    const bioRef = useRef<null | HTMLDivElement>(null);

    const scrollToBios = () => {
        if (bioRef.current !== null) {
            bioRef.current.scrollIntoView({behavior: 'smooth'});
        }
    };

    const gptLanguage = locale == 'en' ? 'anglais' : 'francais'

    const prompt = `Fait le sommelier pour moi, le vin que je bois est ${wineName}. Retourne moi une petite description du vin, la robe, le nez, saveur en bouche ainsi que des accords Mets-vins.
     Identifies clairement tes réponses étiquetée par des numéros: "1.", "2.", and "3.".
     Exemple: 
     1.Description
     2.La robe
     3.Le nez
     4.La bouche
     5.Accords mets-vins
     Répond moi dans la langue suivante : ${gptLanguage}`

    const generateBio = async (e: any) => {
        e.preventDefault();
        setGeneratedBios('');
        setLoading(true);
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
            }),
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = response.body;
        if (!data) {
            return;
        }

        const onParseGPT = (event: ParsedEvent | ReconnectInterval) => {
            if (event.type === 'event') {
                const data = event.data;
                try {
                    const text = JSON.parse(data).text ?? '';
                    setGeneratedBios((prev) => prev + text);
                } catch (e) {
                    console.error(e);
                }
            }
        };


        const onParse = onParseGPT;

        const reader = data.getReader();
        const decoder = new TextDecoder();
        const parser = createParser(onParse);
        let done = false;
        while (!done) {
            const {value, done: doneReading} = await reader.read();
            done = doneReading;
            const chunkValue = decoder.decode(value);
            parser.feed(chunkValue);
        }
        scrollToBios();
        setLoading(false);
    };

    return (
        <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <Head>
                <title>vno</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Header/>

            <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-12 sm:mt-20">
                <h3 className="text-red-800 sm:text-6xl text-4xl max-w-[708px] font-bold">
                    {t('mainTitle')}
                </h3>
                <div className="max-w-xl w-full">
                    <div className="flex mt-10 items-center space-x-3">
                        <Image
                            src="/1-black.png"
                            width={30}
                            height={30}
                            alt="1 icon"
                            className="mb-5 sm:mb-0"
                        />
                        <p className="text-left font-medium">
                            {t('mainQuestion')}
                        </p>
                    </div>
                    <textarea
                        value={wineName}
                        onChange={(e) => setWineName(e.target.value)}
                        rows={1}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black my-5"
                        placeholder={'Ex: Carpineto Brunello-di-Montalcino 2018'}
                    />
                    {!loading && (
                        <button
                            className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                            onClick={(e) => generateBio(e)}
                        >
                            {t('mainButton')} &rarr;
                        </button>
                    )}
                    {loading && (
                        <button
                            className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                            disabled
                        >
                            <LoadingDots color="white" style="large"/>
                        </button>
                    )}
                </div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{duration: 2000}}
                />
                <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700"/>
                <div className="space-y-10 my-10">
                    {generatedBios && (
                        <>
                            <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                                {generatedBios
                                    .substring(generatedBios.indexOf('1') + 3)
                                    .split(/[0-9]+\./)
                                    .map((generatedBio) => {
                                        return (
                                            <div
                                                className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(generatedBio);
                                                    toast(`${t('copy')}`, {
                                                        icon: '✂️',
                                                    });
                                                }}
                                                key={generatedBio}
                                            >
                                                <p>{generatedBio}</p>
                                            </div>
                                        );
                                    })}
                            </div>
                        </>
                    )}
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default Home;
