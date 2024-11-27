import { MatchResult } from "@/utils/data";

export const HighlightedText: React.FC<MatchResult> = ({ value, matches }) => {
  if (!matches.length) return <>{value}</>;

  // to handle overlapping matches, sort them by start position
  const sortedMatches = [...matches].sort((a, b) => a.start - b.start);

  let lastIndex = 0;
  const segments: JSX.Element[] = [];

  sortedMatches.forEach((match, index) => {
    if (match.start > lastIndex) {
      // non highlighted text
      segments.push(<span key={`text-${index}`}>{value.slice(lastIndex, match.start)}</span>);
    }

    segments.push(
      <span key={`highlight-${index}`} className="bg-yellow-200 rounded-sm">
        {value.slice(match.start, match.end)}
      </span>
    );

    lastIndex = match.end;
  });

  if (lastIndex < value.length) {
    // remaining non highlighted text
    segments.push(<span key={"text-last"}>{value.slice(lastIndex)}</span>);
  }

  return <>{segments}</>;
};
