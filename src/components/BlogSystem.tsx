/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BlogPost, Comment } from '../types';
import { Search, Calendar, Heart, BookOpen, MessageSquare, ArrowLeft, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BlogSystemProps {
  posts: BlogPost[];
  onAddComment: (postId: string, comment: Comment) => void;
  onIncrementReads: (postId: string) => void;
}

export default function BlogSystem({ posts, onAddComment, onIncrementReads }: BlogSystemProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // New comment input fields
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');

  // Likes structure cached locally in component/localStorage
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [hasLiked, setHasLiked] = useState<{ [key: string]: boolean }>({});

  const categories = ['All', 'Adventure', 'Budget Travel', 'Solo Travel', 'Family Travel', 'Travel Photography'];

  // Handle like toggle
  const handleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const curLiked = hasLiked[postId] || false;
    setHasLiked((prev) => ({ ...prev, [postId]: !curLiked }));
    setLikes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 24) + (curLiked ? -1 : 1),
    }));
  };

  // Handle viewing a post
  const handleViewPost = (post: BlogPost) => {
    setSelectedPost(post);
    onIncrementReads(post.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit new comment
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim() || !selectedPost) return;

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: authorName,
      content: commentText,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 500000)}?auto=format&fit=crop&w=150&q=80`,
    };

    onAddComment(selectedPost.id, newComment);

    // Sync state for local reader
    setSelectedPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        comments: [...prev.comments, newComment],
      };
    });

    setAuthorName('');
    setCommentText('');
  };

  // Filter logic
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8" id="blog-master-outer-container">
      <AnimatePresence mode="wait">
        {!selectedPost ? (
          /* List Mode */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
            key="list-mode"
          >
            {/* Header section with category tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="max-w-xl">
                  <span className="text-xs font-semibold tracking-wider uppercase text-sky-blue px-2.5 py-1 bg-sky-blue/10 rounded-full">
                    Travel Logues
                  </span>
                  <h1 className="text-3xl md:text-5xl font-serif text-dark-gray mt-2 leading-tight">
                    Travel Chronicles & Stories
                  </h1>
                </div>

                {/* Article Search Box */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search travel logs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-blue focus:bg-white transition-all text-dark-gray placeholder-neutral-400"
                    id="search-articles-input"
                  />
                </div>
              </div>

              {/* Tag Categories filter */}
              <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-sky-blue text-white shadow-sm'
                        : 'bg-neutral-50 text-neutral-600 hover:bg-neutral-100 border border-neutral-200 hover:text-dark-gray'
                    }`}
                    id={`blog-category-filter-${cat.toLowerCase().replace(' ', '-')}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Post Hero Panel */}
            {filteredPosts.length > 0 && activeCategory === 'All' && !searchQuery && (
              <div
                onClick={() => handleViewPost(filteredPosts[0])}
                className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-305 cursor-pointer grid md:grid-cols-12 group"
                id="blog-hero-featured"
              >
                <div className="md:col-span-7 h-[280px] md:h-[420px] relative overflow-hidden">
                  <img
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-sky-blue text-white text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full font-semibold shadow-sm">
                    Featured Article
                  </span>
                </div>
                <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between bg-neutral-50/50">
                  <div>
                    <span className="text-xs text-sky-blue font-mono uppercase font-semibold">
                      {filteredPosts[0].category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-serif text-dark-gray font-bold mt-2 hover:text-sky-blue transition-colors leading-tight">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-xs md:text-sm text-neutral-500 mt-3 line-clamp-4 leading-relaxed">
                      {filteredPosts[0].excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-neutral-200/50 pt-4 text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-300" />
                      {filteredPosts[0].date}
                    </span>
                    <span className="flex items-center gap-1 bg-white border border-neutral-200 px-3 py-1 rounded-full text-sky-blue font-semibold">
                      Read Log
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Standard Grid of remaining stories */}
            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm text-center py-16 border border-neutral-100">
                <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-dark-gray">No Articles Found</h3>
                <p className="text-neutral-500 text-sm mt-1 max-w-sm mx-auto">
                  We don&apos;t have articles matching that exact filters. Try looking in other travel streams.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Skip first post if viewing "All" to avoid repeating hero banner */}
                {filteredPosts
                  .slice(activeCategory === 'All' && !searchQuery ? 1 : 0)
                  .map((post) => {
                    const postLikeCount = likes[post.id] || 24;
                    const didLike = hasLiked[post.id] || false;

                    return (
                      <article
                        key={post.id}
                        onClick={() => handleViewPost(post)}
                        className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
                        id={`blog-item-card-${post.id}`}
                      >
                        <div>
                          <div className="aspect-[16/10] w-full relative overflow-hidden bg-neutral-100">
                            <img
                              src={post.image}
                              alt={post.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-sky-blue font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                              {post.category}
                            </span>
                          </div>

                          <div className="p-5">
                            <div className="flex gap-2 text-[10px] text-neutral-400 font-mono mb-2">
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>{post.reads} reads</span>
                            </div>
                            <h3 className="font-serif text-lg font-bold text-dark-gray leading-snug hover:text-sky-blue transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-xs text-neutral-500 mt-2 line-clamp-3 leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>
                        </div>

                        <div className="p-5 pt-0 border-t border-neutral-50/80 flex items-center justify-between text-xs font-mono">
                          <button
                            onClick={(e) => handleLike(post.id, e)}
                            className="flex items-center gap-1 text-neutral-500 hover:text-red-500 transition-colors"
                          >
                            <Heart className={`w-4 h-4 ${didLike ? 'text-red-500 fill-current animate-pulse' : 'text-neutral-400'}`} />
                            <span>{postLikeCount}</span>
                          </button>
                          <div className="flex items-center gap-1 text-neutral-400">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{post.comments.length}</span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
              </div>
            )}
          </motion.div>
        ) : (
          /* Reader Mode */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="grid lg:grid-cols-12 gap-8"
            key="reader-mode"
          >
            {/* Main Article column */}
            <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 md:p-10">
              
              {/* Back Button */}
              <button
                onClick={() => setSelectedPost(null)}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-sky-blue bg-neutral-100 hover:bg-sky-blue/10 px-3 py-1.5 rounded-lg font-medium transition-all mb-6"
                id="btn-back-to-blog-list"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Travel Logs
              </button>

              <div className="mb-4">
                <span className="text-xs font-mono font-bold text-sky-blue uppercase tracking-widest bg-sky-blue/10 px-2.5 py-1 rounded">
                  {selectedPost.category}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-dark-gray font-bold line-height mt-3 leading-tight">
                  {selectedPost.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 mt-4 border-b border-neutral-100 pb-4">
                  <span>Published: {selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.reads} views</span>
                </div>
              </div>

              {/* Main Banner */}
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden shadow-inner mb-6 relative">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Markup render (split in paragraphs beautifully) */}
              <div className="prose max-w-none text-neutral-600 text-sm md:text-base leading-relaxed space-y-5" id="blog-body-markup">
                {selectedPost.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('###')) {
                    return (
                      <h3 key={index} className="text-xl font-serif font-bold text-dark-gray mt-6 mb-2">
                        {paragraph.replace('###', '').trim()}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('-')) {
                    return (
                      <ul key={index} className="list-disc pl-5 my-3 text-sm space-y-1">
                        {paragraph.split('\n').map((item, itemIdx) => (
                          <li key={itemIdx}>{item.replace('-', '').trim()}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>

              {/* Social Interactions bar */}
              <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => handleLike(selectedPost.id, e)}
                    className="flex items-center gap-1.5 bg-neutral-50 px-3.5 py-1.5 rounded-full border border-neutral-200 text-sm text-neutral-600 hover:text-red-500 hover:bg-neutral-100 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${hasLiked[selectedPost.id] ? 'text-red-500 fill-current' : 'text-neutral-400'}`} />
                    <span>{likes[selectedPost.id] || 24} Passion likes</span>
                  </button>
                </div>
                <span className="text-xs text-neutral-400 font-mono uppercase">
                  Miles & Memories Stories
                </span>
              </div>

              {/* Comments Section */}
              <div className="mt-12 pt-8 border-t border-neutral-100">
                <h3 className="font-serif text-xl font-bold text-dark-gray flex items-center gap-2 mb-6">
                  <MessageSquare className="w-5 h-5 text-sky-blue" />
                  Reader Comments ({selectedPost.comments.length})
                </h3>

                {/* Submitting form */}
                <form onSubmit={handleSubmitComment} className="bg-neutral-50/50 p-4 rounded-xl border border-neutral-200/60 mb-8 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-sky-blue" /> Write a Response
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Your name or handle..."
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-blue"
                      />
                    </div>
                  </div>
                  <div>
                    <textarea
                      placeholder="Share your traveler experiences or comment regarding this article guide..."
                      rows={3}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      required
                      className="w-full p-3 bg-white border border-neutral-200 rounded-lg text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-blue"
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-sky-blue hover:bg-sky-blue/90 text-white font-medium text-xs px-4 py-2 rounded-lg shadow-sm flex items-center gap-1"
                    >
                      <Send className="w-3.5 h-3.5" /> Submit Comment
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {selectedPost.comments.length === 0 ? (
                    <p className="text-neutral-400 text-xs text-center py-6 italic">
                      Be the first to share an authentic traveler comment!
                    </p>
                  ) : (
                    selectedPost.comments.map((comment, idx) => (
                      <div key={comment.id || idx} className="bg-white p-4 rounded-xl border border-neutral-100 flex gap-3 shadow-min leading-snug">
                        <img
                          src={comment.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                          alt={comment.author}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-full object-cover mt-0.5 shrink-0 bg-neutral-100"
                        />
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-bold text-dark-gray">{comment.author}</span>
                            <span className="text-[10px] font-mono text-neutral-400">{comment.date}</span>
                          </div>
                          <p className="text-xs text-neutral-600 leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>

            {/* Sidebar with related posts */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Inspiration Widget */}
              <div className="bg-dark-gray text-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-sky-blue/10 backdrop-blur-3xl"></div>
                <div className="relative z-10">
                  <h3 className="font-serif text-lg font-bold text-sand-beige mb-1">
                    Inspire Your Tribe
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    &ldquo;Adventure is worthwhile in itself.&rdquo;
                    <span className="block mt-2 font-mono text-[10px] text-sky-blue">— Amelia Earhart</span>
                  </p>
                </div>
              </div>

              {/* Related posts title */}
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6 space-y-4">
                <h3 className="font-serif text-lg font-bold text-dark-gray border-b border-neutral-100 pb-2">
                  Other Stories You Might Love
                </h3>
                <div className="space-y-4">
                  {posts
                    .filter((p) => p.id !== selectedPost.id)
                    .slice(0, 3)
                    .map((other) => (
                      <div
                        key={other.id}
                        onClick={() => handleViewPost(other)}
                        className="flex gap-3 cursor-pointer group"
                      >
                        <img
                          src={other.image}
                          alt={other.title}
                          referrerPolicy="no-referrer"
                          className="w-16 h-12 rounded object-cover shrink-0 bg-neutral-100"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-dark-gray group-hover:text-sky-blue transition-colors leading-snug line-clamp-2">
                            {other.title}
                          </h4>
                          <span className="text-[10px] font-mono text-neutral-400 block mt-1">
                            {other.category}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
