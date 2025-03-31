"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useEffect, useState } from "react"
import Link from "next/link"
import {
  type ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { DataGrid, DataGridContainer } from "@/components/ui/data-grid"
import { DataGridPagination } from "@/components/ui/data-grid-pagination"
import { DataGridTable } from "@/components/ui/data-grid-table"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Search, Users, UserPlus, Calendar, RefreshCw } from "lucide-react"

interface IData {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export default function DataGridDemo() {
  const [data, setData] = useState<IData[]>([])
  const [filteredData, setFilteredData] = useState<IData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [sorting, setSorting] = useState<SortingState>([{ id: "name", desc: true }])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/home")
        const result = await response.json()
        console.log("Fetched Data:", result)

        if (!result || !Array.isArray(result.users)) {
          console.error("Error: Expected an array but received", result)
          return
        }

        const formattedUsers = result.users.map((user: Partial<IData>, index: number) => ({
          id: user.id ?? index.toString(),
          name: user.name ?? "Unknown",
          email: user.email ?? "No Email",
          createdAt: user.createdAt ?? "N/A",
          updatedAt: user.updatedAt ?? "N/A",
        }))

        setData(formattedUsers)
        setFilteredData(formattedUsers)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = data.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredData(filtered)
    } else {
      setFilteredData(data)
    }
  }, [searchQuery, data])

  const columns: ColumnDef<IData>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => <span className="font-medium">{info.getValue() as string}</span>,
      size: 175,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => (
        <Link href={`mailto:${info.getValue()}`} className="hover:text-primary hover:underline ">
          {info.getValue() as string}
        </Link>
      ),
      size: 150,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: (info) => <span>{new Date(info.getValue() as string).toLocaleDateString()}</span>,
      size: 150,
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: (info) => <span>{new Date(info.getValue() as string).toLocaleDateString()}</span>,
      size: 150,
    },
  ]

  const table = useReactTable({
    columns,
    data: filteredData,
    pageCount: Math.ceil((filteredData?.length || 0) / pagination.pageSize),
    state: {
      pagination,
      sorting,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  // Calculate statistics
  const totalUsers = data.length
  const recentUsers = data.filter((user) => {
    const createdDate = new Date(user.createdAt)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    return createdDate > thirtyDaysAgo
  }).length

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/home")
      const result = await response.json()

      if (!result || !Array.isArray(result.users)) {
        console.error("Error: Expected an array but received", result)
        return
      }

      const formattedUsers = result.users.map((user: Partial<IData>, index: number) => ({
        id: user.id ?? index.toString(),
        name: user.name ?? "Unknown",
        email: user.email ?? "No Email",
        createdAt: user.createdAt ?? "N/A",
        updatedAt: user.updatedAt ?? "N/A",
      }))

      setData(formattedUsers)
      setFilteredData(formattedUsers)
    } catch (error) {
      console.error("Error refreshing data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
         <Avatar>
      <AvatarImage src="/media/avatars/14.png" alt="@crudhunt" />
      <AvatarFallback>CH</AvatarFallback>
    </Avatar>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground mt-1">View and manage all registered users in the system</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>

        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered users in the system</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users (30 days)</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentUsers}</div>
            <p className="text-xs text-muted-foreground">
              {recentUsers > 0 ? `+${recentUsers} from last month` : "No new users this month"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex w-full sm:w-auto gap-2">
            <div className="relative w-full sm:w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>User Directory</CardTitle>
              <CardDescription>
                Showing {filteredData.length} of {totalUsers} total users
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-[300px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <DataGrid
                  table={table}
                  tableLayout={{
                    cellBorder: true,
                  }}
                  recordCount={filteredData?.length || 0}
                >
                  <div className="w-full space-y-2.5">
                    <DataGridContainer>
                      <ScrollArea>
                        <DataGridTable />
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </DataGridContainer>
                    <DataGridPagination />
                  </div>
                </DataGrid>
              )}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}

