// 관리자 화면은 공개 페이지의 큰 글자 크기를 따르지 않는다 (globals.css의 .admin-scope)
export default function AdminScopeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="admin-scope">{children}</div>
}
