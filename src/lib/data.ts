import { supabase } from './supabase'

// ============================
// Type Definitions
// ============================

export interface Product {
  id: string
  name: string
  nameKo: string
  category: string
  price: number
  description: string
  detail: string
  features: string[]
  image: string
  inStock: boolean
  createdAt: string
}

export interface OrderItem {
  productId: string
  nameKo: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  userId?: string
  items: OrderItem[]
  customer: {
    name: string
    phone: string
    email: string
    company: string
    address: string
    message: string
  }
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled'
  totalAmount: number
  createdAt: string
}

export interface NewsItem {
  id: string
  title: string
  content: string
  category: 'notice' | 'product' | 'guide'
  date: string
  published: boolean
}

export interface User {
  id: string
  email: string
  password: string
  name: string
  phone: string
  role: 'user' | 'admin'
  createdAt: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

export interface Inquiry {
  id: string
  userId: string
  userName: string
  title: string
  content: string
  category: 'product' | 'order' | 'delivery' | 'etc'
  reply?: string
  repliedAt?: string
  status: 'waiting' | 'replied'
  createdAt: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: 'product' | 'order' | 'delivery' | 'general'
  order: number
  published: boolean
  createdAt: string
}

// ============================
// Mapping: snake_case DB <-> camelCase JS
// ============================

/* eslint-disable @typescript-eslint/no-explicit-any */

function toProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    nameKo: row.name_ko,
    category: row.category,
    price: row.price,
    description: row.description,
    detail: row.detail,
    features: row.features || [],
    image: row.image,
    inStock: row.in_stock,
    createdAt: row.created_at,
  }
}

function toOrder(row: any): Order {
  return {
    id: row.id,
    userId: row.user_id || undefined,
    items: row.items,
    customer: row.customer,
    status: row.status,
    totalAmount: row.total_amount,
    createdAt: row.created_at,
  }
}

function toUser(row: any): User {
  return {
    id: row.id,
    email: row.email,
    password: row.password,
    name: row.name,
    phone: row.phone,
    role: row.role,
    createdAt: row.created_at,
  }
}

function toNewsItem(row: any): NewsItem {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    category: row.category,
    date: row.date,
    published: row.published,
  }
}

function toReview(row: any): Review {
  return {
    id: row.id,
    productId: row.product_id,
    userId: row.user_id,
    userName: row.user_name,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.created_at,
  }
}

function toInquiry(row: any): Inquiry {
  return {
    id: row.id,
    userId: row.user_id,
    userName: row.user_name,
    title: row.title,
    content: row.content,
    category: row.category,
    reply: row.reply || undefined,
    repliedAt: row.replied_at || undefined,
    status: row.status,
    createdAt: row.created_at,
  }
}

function toFAQItem(row: any): FAQItem {
  return {
    id: row.id,
    question: row.question,
    answer: row.answer,
    category: row.category,
    order: row.display_order,
    published: row.published,
    createdAt: row.created_at,
  }
}

/* eslint-enable @typescript-eslint/no-explicit-any */

// ============================
// Products
// ============================

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*')
  if (error) throw error
  return (data || []).map(toProduct)
}

export async function getProduct(id: string): Promise<Product | undefined> {
  const { data, error } = await supabase.from('products').select('*').eq('id', id).single()
  if (error) return undefined
  return toProduct(data)
}

export async function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
  const row = {
    id: String(Date.now()),
    name: product.name,
    name_ko: product.nameKo,
    category: product.category,
    price: product.price,
    description: product.description,
    detail: product.detail,
    features: product.features,
    image: product.image,
    in_stock: product.inStock,
  }
  const { data, error } = await supabase.from('products').insert(row).select().single()
  if (error) throw error
  return toProduct(data)
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const row: Record<string, unknown> = {}
  if (updates.name !== undefined) row.name = updates.name
  if (updates.nameKo !== undefined) row.name_ko = updates.nameKo
  if (updates.category !== undefined) row.category = updates.category
  if (updates.price !== undefined) row.price = updates.price
  if (updates.description !== undefined) row.description = updates.description
  if (updates.detail !== undefined) row.detail = updates.detail
  if (updates.features !== undefined) row.features = updates.features
  if (updates.image !== undefined) row.image = updates.image
  if (updates.inStock !== undefined) row.in_stock = updates.inStock
  const { data, error } = await supabase.from('products').update(row).eq('id', id).select().single()
  if (error) throw error
  return toProduct(data)
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

export async function saveProducts(products: Product[]): Promise<void> {
  const rows = products.map((p) => ({
    id: p.id,
    name: p.name,
    name_ko: p.nameKo,
    category: p.category,
    price: p.price,
    description: p.description,
    detail: p.detail,
    features: p.features,
    image: p.image,
    in_stock: p.inStock,
    created_at: p.createdAt,
  }))
  const { error } = await supabase.from('products').upsert(rows, { onConflict: 'id' })
  if (error) throw error
}

// ============================
// Orders
// ============================

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map(toOrder)
}

export async function getOrder(id: string): Promise<Order | undefined> {
  const { data, error } = await supabase.from('orders').select('*').eq('id', id).single()
  if (error) return undefined
  return toOrder(data)
}

export async function addOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
  const row = {
    user_id: order.userId || null,
    items: order.items,
    customer: order.customer,
    status: order.status || 'pending',
    total_amount: order.totalAmount,
  }
  const { data, error } = await supabase.from('orders').insert(row).select().single()
  if (error) throw error
  return toOrder(data)
}

export async function updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
  const row: Record<string, unknown> = {}
  if (updates.status !== undefined) row.status = updates.status
  if (updates.items !== undefined) row.items = updates.items
  if (updates.customer !== undefined) row.customer = updates.customer
  if (updates.totalAmount !== undefined) row.total_amount = updates.totalAmount
  const { data, error } = await supabase.from('orders').update(row).eq('id', id).select().single()
  if (error) throw error
  return toOrder(data)
}

export async function saveOrders(orders: Order[]): Promise<void> {
  for (const order of orders) {
    await updateOrder(order.id, order)
  }
}

// ============================
// News
// ============================

export async function getNews(): Promise<NewsItem[]> {
  const { data, error } = await supabase.from('news').select('*').order('date', { ascending: false })
  if (error) throw error
  return (data || []).map(toNewsItem)
}

export async function getNewsItem(id: string): Promise<NewsItem | undefined> {
  const { data, error } = await supabase.from('news').select('*').eq('id', id).single()
  if (error) return undefined
  return toNewsItem(data)
}

export async function addNewsItem(item: Omit<NewsItem, 'id'>): Promise<NewsItem> {
  const row = {
    id: String(Date.now()),
    title: item.title,
    content: item.content,
    category: item.category,
    date: item.date,
    published: item.published,
  }
  const { data, error } = await supabase.from('news').insert(row).select().single()
  if (error) throw error
  return toNewsItem(data)
}

export async function updateNewsItem(id: string, updates: Partial<NewsItem>): Promise<NewsItem> {
  const row: Record<string, unknown> = {}
  if (updates.title !== undefined) row.title = updates.title
  if (updates.content !== undefined) row.content = updates.content
  if (updates.category !== undefined) row.category = updates.category
  if (updates.date !== undefined) row.date = updates.date
  if (updates.published !== undefined) row.published = updates.published
  const { data, error } = await supabase.from('news').update(row).eq('id', id).select().single()
  if (error) throw error
  return toNewsItem(data)
}

export async function deleteNewsItem(id: string): Promise<void> {
  const { error } = await supabase.from('news').delete().eq('id', id)
  if (error) throw error
}

export async function saveNews(news: NewsItem[]): Promise<void> {
  const rows = news.map((n) => ({
    id: n.id,
    title: n.title,
    content: n.content,
    category: n.category,
    date: n.date,
    published: n.published,
  }))
  const { error } = await supabase.from('news').upsert(rows, { onConflict: 'id' })
  if (error) throw error
}

// ============================
// Users
// ============================

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase.from('users').select('*')
  if (error) throw error
  return (data || []).map(toUser)
}

export async function getUser(id: string): Promise<User | undefined> {
  const { data, error } = await supabase.from('users').select('*').eq('id', id).single()
  if (error) return undefined
  return toUser(data)
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const { data, error } = await supabase.from('users').select('*').eq('email', email).single()
  if (error) return undefined
  return toUser(data)
}

export async function addUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const row = {
    email: user.email,
    password: user.password,
    name: user.name,
    phone: user.phone,
    role: user.role,
  }
  const { data, error } = await supabase.from('users').insert(row).select().single()
  if (error) throw error
  return toUser(data)
}

export async function deleteUser(id: string): Promise<void> {
  const { error } = await supabase.from('users').delete().eq('id', id)
  if (error) throw error
}

export async function saveUsers(users: User[]): Promise<void> {
  const rows = users.map((u) => ({
    id: u.id,
    email: u.email,
    password: u.password,
    name: u.name,
    phone: u.phone,
    role: u.role,
    created_at: u.createdAt,
  }))
  const { error } = await supabase.from('users').upsert(rows, { onConflict: 'id' })
  if (error) throw error
}

// ============================
// Reviews
// ============================

export async function getReviews(): Promise<Review[]> {
  const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map(toReview)
}

export async function getReviewsByProduct(productId: string): Promise<Review[]> {
  const { data, error } = await supabase.from('reviews').select('*').eq('product_id', productId).order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map(toReview)
}

export async function getReviewsByUser(userId: string): Promise<Review[]> {
  const { data, error } = await supabase.from('reviews').select('*').eq('user_id', userId).order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map(toReview)
}

export async function addReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
  const row = {
    product_id: review.productId,
    user_id: review.userId,
    user_name: review.userName,
    rating: review.rating,
    comment: review.comment,
  }
  const { data, error } = await supabase.from('reviews').insert(row).select().single()
  if (error) throw error
  return toReview(data)
}

export async function deleteReview(id: string): Promise<void> {
  const { error } = await supabase.from('reviews').delete().eq('id', id)
  if (error) throw error
}

export async function saveReviews(reviews: Review[]): Promise<void> {
  const rows = reviews.map((r) => ({
    id: r.id,
    product_id: r.productId,
    user_id: r.userId,
    user_name: r.userName,
    rating: r.rating,
    comment: r.comment,
    created_at: r.createdAt,
  }))
  const { error } = await supabase.from('reviews').upsert(rows, { onConflict: 'id' })
  if (error) throw error
}

// ============================
// Inquiries
// ============================

export async function getInquiries(): Promise<Inquiry[]> {
  const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map(toInquiry)
}

export async function getInquiriesByUser(userId: string): Promise<Inquiry[]> {
  const { data, error } = await supabase.from('inquiries').select('*').eq('user_id', userId).order('created_at', { ascending: false })
  if (error) throw error
  return (data || []).map(toInquiry)
}

export async function addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Promise<Inquiry> {
  const row = {
    user_id: inquiry.userId,
    user_name: inquiry.userName,
    title: inquiry.title,
    content: inquiry.content,
    category: inquiry.category,
  }
  const { data, error } = await supabase.from('inquiries').insert(row).select().single()
  if (error) throw error
  return toInquiry(data)
}

export async function updateInquiry(id: string, updates: { reply: string }): Promise<Inquiry> {
  const row = {
    reply: updates.reply,
    replied_at: new Date().toISOString(),
    status: 'replied',
  }
  const { data, error } = await supabase.from('inquiries').update(row).eq('id', id).select().single()
  if (error) throw error
  return toInquiry(data)
}

export async function deleteInquiry(id: string): Promise<void> {
  const { error } = await supabase.from('inquiries').delete().eq('id', id)
  if (error) throw error
}

export async function saveInquiries(inquiries: Inquiry[]): Promise<void> {
  const rows = inquiries.map((i) => ({
    id: i.id,
    user_id: i.userId,
    user_name: i.userName,
    title: i.title,
    content: i.content,
    category: i.category,
    reply: i.reply || null,
    replied_at: i.repliedAt || null,
    status: i.status,
    created_at: i.createdAt,
  }))
  const { error } = await supabase.from('inquiries').upsert(rows, { onConflict: 'id' })
  if (error) throw error
}

// ============================
// FAQ
// ============================

export async function getFAQ(): Promise<FAQItem[]> {
  const { data, error } = await supabase.from('faq').select('*').order('display_order', { ascending: true })
  if (error) throw error
  return (data || []).map(toFAQItem)
}

export async function addFAQItem(item: Omit<FAQItem, 'id' | 'createdAt'>): Promise<FAQItem> {
  const row = {
    id: `FAQ-${Date.now()}`,
    question: item.question,
    answer: item.answer,
    category: item.category,
    display_order: item.order,
    published: item.published,
  }
  const { data, error } = await supabase.from('faq').insert(row).select().single()
  if (error) throw error
  return toFAQItem(data)
}

export async function updateFAQItem(id: string, updates: Partial<FAQItem>): Promise<FAQItem> {
  const row: Record<string, unknown> = {}
  if (updates.question !== undefined) row.question = updates.question
  if (updates.answer !== undefined) row.answer = updates.answer
  if (updates.category !== undefined) row.category = updates.category
  if (updates.order !== undefined) row.display_order = updates.order
  if (updates.published !== undefined) row.published = updates.published
  const { data, error } = await supabase.from('faq').update(row).eq('id', id).select().single()
  if (error) throw error
  return toFAQItem(data)
}

export async function deleteFAQItem(id: string): Promise<void> {
  const { error } = await supabase.from('faq').delete().eq('id', id)
  if (error) throw error
}

export async function saveFAQ(faq: FAQItem[]): Promise<void> {
  const rows = faq.map((f) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category,
    display_order: f.order,
    published: f.published,
    created_at: f.createdAt,
  }))
  const { error } = await supabase.from('faq').upsert(rows, { onConflict: 'id' })
  if (error) throw error
}
