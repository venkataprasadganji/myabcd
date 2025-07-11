import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import CurrentAffairCard from '../components/CurrentAffairsCard';
import Pagination from '../components/Pagination';
import FilterBar from '../components/FilterBar';
import '../styles/CurrentAffairsList.css';

const PAGE_SIZE = 5;

const CurrentAffairsList = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ year: '', month: '', date: '', topic: '', timeRange: '' });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const q = query(collection(db, 'news-articles'), orderBy('created_at', 'desc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setArticles(data);
        setFilteredArticles(data);
      } catch (error) {
        console.error("❌ Error fetching current affairs:", error);
      }
    };
    fetchArticles();
  }, []);

  const applyFilters = () => {
    const { year, month, date, topic, timeRange } = filters;
    const now = new Date();
    let filtered = articles;

    if (timeRange === 'lastWeek') {
      const lastWeek = new Date(now);
      lastWeek.setDate(now.getDate() - 7);
      filtered = filtered.filter(article => new Date(article.created_at) >= lastWeek);
    } else if (timeRange === 'lastMonth') {
      const lastMonth = new Date(now);
      lastMonth.setMonth(now.getMonth() - 1);
      filtered = filtered.filter(article => new Date(article.created_at) >= lastMonth);
    }

    filtered = filtered.filter(article => {
      const createdAt = new Date(article.created_at);
      return (
        (!year || createdAt.getFullYear().toString() === year) &&
        (!month || (createdAt.getMonth() + 1).toString().padStart(2, '0') === month) &&
        (!date || createdAt.getDate().toString().padStart(2, '0') === date) &&
        (!topic || article.topic?.toLowerCase() === topic.toLowerCase())
      );
    });

    setFilteredArticles(filtered);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="ca-container">
      <h2 className="ca-heading">📰 Current Affairs</h2>
      <FilterBar filters={filters} setFilters={setFilters} applyFilters={applyFilters} />
      <div className="ca-cards">
        {paginatedArticles.map((article, idx) => (
          <CurrentAffairCard key={idx} {...article} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredArticles.length / PAGE_SIZE)}
        onPrevious={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        onNext={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredArticles.length / PAGE_SIZE)))}
      />
    </div>
  );
};

export default CurrentAffairsList;
