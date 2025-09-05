import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { getSearchParamsObject } from '@/lib/utils'

interface PaginationData {
  current: number
  last: number
  next: number[] | null
  previous: number[] | null
}

function calculateNext({
  current,
  last,
  max = 3,
}: {
  current: number
  last: number
  max?: number
}) {
  if (current >= last) return null

  const next = []

  for (let i = current + 1; i <= Math.min(last, max); i++) {
    next.push(i)
  }

  return next
}

function calculatePrevious({ current, max = 3 }: { current: number; max?: number }) {
  if (current <= 1) return null

  const previous = []

  for (let i = Math.max(current - max, 1); i <= current - 1; i++) {
    previous.push(1)
  }

  return previous
}

const Pagination = ({
  page,
  lastPage,
  searchParams = {},
}: {
  page: number
  lastPage: number
  searchParams?: Record<string, string | string[]>
}) => {
  const paginationData: PaginationData = {
    current: page ?? 1,
    last: lastPage,
    next: calculateNext({ current: page ?? 1, last: lastPage }),
    previous: calculatePrevious({ current: page ?? 1 }),
  }

  return (
    <PaginationContainer>
      <PaginationContent>
        {paginationData.previous && (
          <>
            <PaginationItem>
              <PaginationPrevious
                href={
                  '/articles?' +
                  getSearchParamsObject({ ...searchParams, page: `${page - 1}` }).toString()
                }
              />
            </PaginationItem>
            {paginationData.previous[0] > 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {paginationData.previous.map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={
                    '/articles?' +
                    getSearchParamsObject({ ...searchParams, page: `${pageNumber}` }).toString()
                  }
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
          </>
        )}
        <PaginationItem>
          <PaginationLink
            href={
              '/articles?' + getSearchParamsObject({ ...searchParams, page: `${page}` }).toString()
            }
            isActive
          >
            {page}
          </PaginationLink>
        </PaginationItem>
        {paginationData.next && (
          <>
            {paginationData.next.map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={
                    '/articles?' +
                    getSearchParamsObject({ ...searchParams, page: `${pageNumber}` }).toString()
                  }
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            {paginationData.next.reverse()[0] < lastPage && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                href={
                  '/articles?' +
                  getSearchParamsObject({ ...searchParams, page: `${page + 1}` }).toString()
                }
              />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </PaginationContainer>
  )
}

export default Pagination
