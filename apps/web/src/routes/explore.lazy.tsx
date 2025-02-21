import LayoutCC from '@/components/custom/LayoutCC';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useBreakpointValue } from '@chakra-ui/react';
import HeaderMobileCC from '@/components/custom/HeaderMobileCC';
import HeaderDesktopCC from '@/components/custom/HeaderDesktopCC';
import { useTranslation } from 'react-i18next';
import Navbar from '@/components/custom/NavbarCC';
import CardHorizontalCC from '@/components/custom/CardHorizontalCC';
import { useEffect, useState } from 'react';

export const Route = createLazyFileRoute('/explore')({
	component: RouteComponent,
});

function RouteComponent() {
	const { t } = useTranslation('common', {
		keyPrefix: 'navigateApp',
	});

	const isMobile = useBreakpointValue({ base: true, lg: false });

// Définition du type d'un article
interface Article {
    title: string;
    link: string;
    description: string;
    pubDate: string;
  }

    const [articles, setArticles] = useState<Article[]>([]); // Initialisation avec un tableau d'articles
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchArticles = async () => {
        try {
          const response = await fetch('http://localhost:3000/rss');
          if (!response.ok) {
            throw new Error('Erreur réseau');
          }
          const data = await response.json();
          setArticles(data); // Mettre à jour l'état avec les articles récupérés
        } catch (err) {
          setError(err.message);
        }
      };
  
      fetchArticles();
    }, []);
  
    if (error) return <div>Erreur : {error}</div>;
  

	return (
		<div>
			 {articles.map((article, index) => (
				<div>key={index}
			<LayoutCC>
		{isMobile ? (
			<div>
				<HeaderMobileCC text={t('explore')} />
				<Navbar />
			</div>
		) : (
			<div>
				<HeaderDesktopCC text={t('explore')} />
				<CardHorizontalCC date={new Date(article.pubDate).toLocaleDateString()} cardTitle={article.title} cardDescription={article.description}/>
		
			</div>
			
		)}
	</LayoutCC>
	</div>
	
	))}
	</div>
	);
}
