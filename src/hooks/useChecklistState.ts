import { useState, useCallback } from 'react';

export function useChecklistState(grade: number, week: number) {
  const storageKey = `hw_checklist_g${grade}_w${week}`;

  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? new Set(JSON.parse(stored) as string[]) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  const toggleItem = useCallback(
    (itemId: string) => {
      setCheckedItems(prev => {
        const next = new Set(prev);
        if (next.has(itemId)) {
          next.delete(itemId);
        } else {
          next.add(itemId);
        }
        try {
          localStorage.setItem(storageKey, JSON.stringify([...next]));
        } catch {
          // ignore
        }
        return next;
      });
    },
    [storageKey],
  );

  const clearAll = useCallback(() => {
    setCheckedItems(new Set());
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  }, [storageKey]);

  return { checkedItems, toggleItem, clearAll };
}

export function getGradeCompletionSummary(
  grade: number,
  totalWeeks: number,
): { week: number; completed: number; total: number }[] {
  const result = [];
  for (let week = 1; week <= totalWeeks; week++) {
    const storageKey = `hw_checklist_g${grade}_w${week}`;
    try {
      const stored = localStorage.getItem(storageKey);
      const checked = stored ? (JSON.parse(stored) as string[]) : [];
      result.push({ week, completed: checked.length, total: 0 });
    } catch {
      result.push({ week, completed: 0, total: 0 });
    }
  }
  return result;
}
