<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupByCause, readAs, uniqueById, type Cause, type CauseGroup, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  type LinkedIssue = { number: number; url: string };
  let { ticket, issues = {} }: { ticket: number; issues?: Partial<Record<Cause, LinkedIssue>> } = $props();

  const sourceRows = reports as Report[];
  const uniqueReports = $derived(uniqueById(sourceRows));
  const duplicateRows = $derived(sourceRows.length - uniqueReports.length);
  const merged = $derived(uniqueReports.filter((r) => r.mergedInto === ticket));
  const groups = $derived(groupByCause(merged, tenantOf));
  const tags = (g: { taggedAs: Record<string, number> }) =>
    Object.entries(g.taggedAs)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, n]) => `${tag} ×${n}`)
      .join(' · ');
  const issueFor = (cause: CauseGroup['cause']): LinkedIssue | undefined =>
    cause === 'parser' || cause === 'hint' ? issues[cause] : undefined;
</script>

<p class="sum">
  <strong>{merged.length}</strong> distinct reports merged into #{ticket} ·
  <strong>{groups.length}</strong>
  {groups.length === 1 ? 'cause' : 'causes'} · {duplicateRows} duplicate rows excluded
</p>

<table>
  <thead>
    <tr><th>cause</th><th>reports</th><th>tagged as</th><th>tenants</th><th>seen</th><th>GitHub issue</th></tr>
  </thead>
  <tbody>
    {#each groups as g (g.cause)}
      {@const issue = issueFor(g.cause)}
      <tr>
        <td><code>{g.cause}</code></td>
        <td>{g.reports.length}</td>
        <td class="tags">{tags(g)}</td>
        <td>{g.tenants}</td>
        <td>{g.firstSeen} → {g.lastSeen}</td>
        <td>
          {#if issue}
            <a href={issue.url}>#{issue.number}</a>
          {:else}
            no issue recorded
          {/if}
        </td>
      </tr>
    {/each}
  </tbody>
</table>

{#each groups as g (g.cause)}
  {@const moved = readAs(g, notes.oneDayMove)}
  {#if moved}
    <p class="note">{moved} reports read as a one-day move; filed under <code>{g.cause}</code> by tenant.</p>
  {/if}
{/each}

<style>
  .sum { font-size: 1.1rem; }
  .tags { color: var(--muted); font-size: 0.85em; }
  .note { color: var(--muted); font-size: 0.85em; }
</style>
