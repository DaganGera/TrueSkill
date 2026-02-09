import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl

    // Protected Routes Configuration
    const studentRoutes = ['/dashboard', '/assessment', '/report']
    const hrRoutes = ['/hr']

    const isStudentRoute = studentRoutes.some(route => pathname.startsWith(route))
    const isHrRoute = hrRoutes.some(route => pathname.startsWith(route))

    // 1. Redirect to login if accessing protected route without token
    if ((isStudentRoute || isHrRoute) && !token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    // 2. Simple Role Check (decoding JWT in middleware is expensive/complex in Edge, 
    // so for MVP we rely on separating logic or just letting the client/backend handle strict RBAC.
    // However, we can check basic path protection here.)

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/assessment/:path*', '/report/:path*', '/hr/:path*'],
}
