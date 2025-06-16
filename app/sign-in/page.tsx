import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-sky-600 to-purple-600 bg-clip-text text-transparent">
              SmartMeal Planner
            </h1>
          </Link>
        </div>

        <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-xl rounded-2xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-slate-800">Welcome Back</CardTitle>
            <CardDescription className="text-slate-600">
              Sign in to your account to continue planning your meals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-12 border-slate-200 focus:border-sky-300 focus:ring-sky-200 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-12 border-slate-200 focus:border-sky-300 focus:ring-sky-200 rounded-xl"
              />
            </div>
            <Button className="w-full h-12 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
              Sign In
            </Button>
          </CardContent>
          <CardFooter className="text-center">
            <p className="text-slate-600">
              {"Don't have an account? "}
              <Link
                href="/signup"
                className="text-sky-600 hover:text-sky-700 font-medium hover:underline transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
