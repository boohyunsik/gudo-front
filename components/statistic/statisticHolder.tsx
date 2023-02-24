import {BLUE_TEAM, RED_TEAM} from "@/core/state/uiState";
import {StatisticItem} from "@/components/statistic/statisticItem";


export const StatisticHolder = () => {
    return (
        <div className="grid grid-cols-2">
            <StatisticItem side={RED_TEAM} />
            <StatisticItem side={BLUE_TEAM} />
        </div>
    )
}