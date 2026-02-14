import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')

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

function readJSON<T>(filename: string): T[] {
  const filePath = path.join(dataDir, filename)
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf-8')
    return []
  }
  const raw = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(raw)
}

function writeJSON<T>(filename: string, data: T[]): void {
  const filePath = path.join(dataDir, filename)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

// Products
export function getProducts(): Product[] {
  return readJSON<Product>('products.json')
}

export function getProduct(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id)
}

export function saveProducts(products: Product[]): void {
  writeJSON('products.json', products)
}

// Orders
export function getOrders(): Order[] {
  return readJSON<Order>('orders.json')
}

export function getOrder(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id)
}

export function saveOrders(orders: Order[]): void {
  writeJSON('orders.json', orders)
}

export function addOrder(order: Omit<Order, 'id' | 'createdAt'>): Order {
  const orders = getOrders()
  const newOrder: Order = {
    ...order,
    id: `APP-${String(orders.length + 1).padStart(4, '0')}`,
    createdAt: new Date().toISOString(),
  }
  orders.push(newOrder)
  saveOrders(orders)
  return newOrder
}

// News
export function getNews(): NewsItem[] {
  return readJSON<NewsItem>('news.json')
}

export function getNewsItem(id: string): NewsItem | undefined {
  return getNews().find((n) => n.id === id)
}

export function saveNews(news: NewsItem[]): void {
  writeJSON('news.json', news)
}

// Users
export function getUsers(): User[] {
  return readJSON<User>('users.json')
}

export function getUser(id: string): User | undefined {
  return getUsers().find((u) => u.id === id)
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email === email)
}

export function saveUsers(users: User[]): void {
  writeJSON('users.json', users)
}

export function addUser(user: Omit<User, 'id' | 'createdAt'>): User {
  const users = getUsers()
  const newUser: User = {
    ...user,
    id: `USR-${String(users.length + 1).padStart(4, '0')}`,
    createdAt: new Date().toISOString(),
  }
  users.push(newUser)
  saveUsers(users)
  return newUser
}

// Reviews
export function getReviews(): Review[] {
  return readJSON<Review>('reviews.json')
}

export function getReviewsByProduct(productId: string): Review[] {
  return getReviews().filter((r) => r.productId === productId)
}

export function getReviewsByUser(userId: string): Review[] {
  return getReviews().filter((r) => r.userId === userId)
}

export function saveReviews(reviews: Review[]): void {
  writeJSON('reviews.json', reviews)
}

export function addReview(review: Omit<Review, 'id' | 'createdAt'>): Review {
  const reviews = getReviews()
  const newReview: Review = {
    ...review,
    id: `REV-${String(reviews.length + 1).padStart(4, '0')}`,
    createdAt: new Date().toISOString(),
  }
  reviews.push(newReview)
  saveReviews(reviews)
  return newReview
}

// Inquiries
export function getInquiries(): Inquiry[] {
  return readJSON<Inquiry>('inquiries.json')
}

export function getInquiriesByUser(userId: string): Inquiry[] {
  return getInquiries().filter((i) => i.userId === userId)
}

export function saveInquiries(inquiries: Inquiry[]): void {
  writeJSON('inquiries.json', inquiries)
}

export function addInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry {
  const inquiries = getInquiries()
  const newInquiry: Inquiry = {
    ...inquiry,
    id: `INQ-${String(inquiries.length + 1).padStart(4, '0')}`,
    status: 'waiting',
    createdAt: new Date().toISOString(),
  }
  inquiries.push(newInquiry)
  saveInquiries(inquiries)
  return newInquiry
}

// FAQ
export function getFAQ(): FAQItem[] {
  return readJSON<FAQItem>('faq.json')
}

export function saveFAQ(faq: FAQItem[]): void {
  writeJSON('faq.json', faq)
}
