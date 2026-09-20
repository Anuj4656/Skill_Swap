import React from 'react';

// SKELETON: USED IN /browse
export const SkeletonCard = () => {
    return (
        <article className="bg-surface-card rounded-xl p-space-lg flex flex-col justify-between border border-border-subtle animate-pulse">
            <div>
                <div className="flex flex-col sm:flex-row items-start sm:justify-between gap-space-sm mb-space-md">
                    <div className="flex items-center gap-space-sm">
                        <div className="w-12 h-12 rounded-full bg-surface-elevated"></div>
                        <div className="flex flex-col gap-1.5">
                            <div className="h-5 w-32 bg-surface-elevated rounded-md"></div>
                            <div className="h-3 w-20 bg-surface-container rounded-md"></div>
                        </div>
                    </div>
                    <div className="h-5 w-24 bg-surface-container rounded-full hidden sm:block"></div>
                </div>

                <div className="space-y-space-md mb-space-md">
                    <div>
                        <div className="h-3 w-16 bg-surface-container rounded-sm mb-2.5"></div>
                        <div className="flex flex-wrap gap-1.5">
                            <div className="h-6 w-24 bg-surface-elevated rounded-lg"></div>
                            <div className="h-6 w-16 bg-surface-elevated rounded-lg"></div>
                        </div>
                    </div>
                    <div>
                        <div className="h-3 w-20 bg-surface-container rounded-sm mb-2.5"></div>
                        <div className="flex flex-wrap gap-1.5">
                            <div className="h-6 w-20 bg-surface-elevated rounded-lg"></div>
                            <div className="h-6 w-28 bg-surface-elevated rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-space-md mt-space-md bg-surface-container-low/60 -mx-space-lg -mb-space-lg p-space-lg rounded-b-xl">
                <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-xs w-full">
                        <div className="h-4 w-4 bg-surface-elevated rounded-full"></div>
                        <div className="h-4 w-8 bg-surface-container rounded-md mr-2"></div>
                        <div className="h-4 w-4 bg-surface-elevated rounded-full"></div>
                        <div className="h-4 w-8 bg-surface-container rounded-md"></div>
                        <div className="h-3 w-16 bg-surface-container rounded-sm ml-1"></div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-space-xs">
                    <div className="flex items-center justify-center w-full h-9 rounded-lg bg-surface-elevated"></div>
                    <div className="flex items-center justify-center w-full h-9 rounded-lg bg-surface-elevated"></div>
                </div>
            </div>
        </article>
    );
};

// SKELETON: USED IN /my-swaps
export const SkeletonSwapRow = () => {
    return (
        <div className="swap-card bg-surface-card rounded-xl p-space-lg flex flex-col gap-space-md shadow-sm border border-border-subtle animate-pulse overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pt-space-xs">
                <div className="flex items-center gap-space-md">
                    <div className="w-12 h-12 rounded-full bg-surface-elevated"></div>
                    <div className="flex flex-col gap-2">
                        <div className="h-5 w-32 bg-surface-elevated rounded-md"></div>
                        <div className="h-3 w-20 bg-surface-container rounded-md"></div>
                    </div>
                </div>
                <div className="h-6 w-24 bg-surface-container rounded-full hidden sm:block"></div>
            </div>

            <div className="bg-surface-container-lowest/80 rounded-xl p-space-md">
                <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-space-sm">
                    <div className="md:col-span-5 bg-surface-elevated rounded-lg p-space-md h-16"></div>
                    <div className="md:col-span-1 flex justify-center py-2"><div className="w-6 h-6 rounded-full bg-surface-container"></div></div>
                    <div className="md:col-span-5 bg-surface-elevated rounded-lg p-space-md h-16"></div>
                </div>
            </div>
            <div className="bg-surface-container rounded-lg p-space-md h-16"></div>
            <div className="flex items-center gap-3 pt-space-sm mt-1">
                <div className="h-8 w-28 bg-surface-container rounded-lg"></div>
                <div className="h-8 w-28 bg-surface-container rounded-lg"></div>
            </div>
        </div>
    );
};

// SKELETON: USED IN /profile
export const SkeletonProfile = () => {
    return (
        <div className="animate-pulse w-full max-w-6xl mx-auto px-gutter py-space-xl">
            <div className="flex items-center justify-between mb-space-lg">
                <div className="h-4 w-32 bg-surface-container rounded-md"></div>
            </div>

            <div className="relative bg-surface-card rounded-xl p-space-lg md:p-space-xl shadow-xl overflow-hidden mb-space-xl border border-border-subtle">
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
                    <div className="flex flex-col sm:flex-row flex-start sm:items-center gap-space-lg">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-surface-elevated"></div>
                        <div className="flex flex-col gap-3 mt-2 sm:mt-0">
                            <div className="h-8 w-48 bg-surface-elevated rounded-lg"></div>
                            <div className="flex gap-4">
                                <div className="h-4 w-24 bg-surface-container rounded-md"></div>
                                <div className="h-4 w-32 bg-surface-container rounded-md"></div>
                            </div>
                            <div className="h-6 w-32 bg-surface-container rounded-full"></div>
                        </div>
                    </div>
                    <div className="h-10 w-40 bg-surface-elevated rounded-lg hidden lg:block"></div>
                </div>

                <div className="mt-space-md pt-space-md border-t border-surface-container flex gap-6">
                    <div className="h-4 w-16 bg-surface-container rounded-sm"></div>
                    <div className="h-4 w-20 bg-surface-container rounded-sm"></div>
                    <div className="h-4 w-16 bg-surface-container rounded-sm"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
                <div className="lg:col-span-7 flex flex-col gap-space-lg">
                    <div className="bg-surface-card rounded-xl p-space-lg shadow-sm h-64 border border-border-subtle"></div>
                    <div className="bg-surface-card rounded-xl p-space-lg shadow-sm h-48 border border-border-subtle"></div>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-space-lg">
                    <div className="bg-surface-card rounded-xl p-space-lg shadow-sm h-96 border border-border-subtle"></div>
                </div>
            </div>
        </div>
    );
};

// SKELETON: USED IN /profile/edit
export const SkeletonEditForm = () => {
    return (
        <div className="animate-pulse w-full max-w-6xl mx-auto px-gutter py-space-xl">
            <div className="flex items-center gap-space-sm mb-space-lg">
                <div className="h-4 w-32 bg-surface-container rounded-md"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
                <div className="lg:col-span-3 flex flex-col gap-2">
                    <div className="h-10 w-full bg-surface-card border border-border-subtle rounded-lg"></div>
                    <div className="h-10 w-full bg-surface-card border border-border-subtle rounded-lg"></div>
                    <div className="h-10 w-full bg-surface-card border border-border-subtle rounded-lg"></div>
                </div>
                <div className="lg:col-span-9 bg-surface-card rounded-xl p-space-lg md:p-space-xl shadow-xl border border-border-subtle flex flex-col gap-space-xl">
                    <div className="flex items-center gap-space-lg">
                        <div className="w-24 h-24 rounded-full bg-surface-elevated"></div>
                        <div className="flex flex-col gap-2">
                            <div className="h-4 w-40 bg-surface-container rounded-md"></div>
                            <div className="h-10 w-32 bg-surface-elevated rounded-lg"></div>
                            <div className="h-3 w-48 bg-surface-container rounded-md"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                        <div className="h-16 w-full bg-surface-elevated rounded-lg"></div>
                        <div className="h-16 w-full bg-surface-elevated rounded-lg"></div>
                        <div className="h-16 w-full bg-surface-elevated rounded-lg md:col-span-2"></div>
                        <div className="h-16 w-full bg-surface-elevated rounded-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
