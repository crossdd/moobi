"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { type App, StoreScreen } from "@/types";
import {
  LuCheck,
  LuChevronLeft,
  LuChevronRight,
  LuDownload,
  LuFlag,
  LuShare,
  LuStar,
} from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import Image from "next/image";

const AppDetails = ({
  selectedApp,
  setSelectedApp,
  setInstalledApps,
  installedApps,
  setScreen,
}: {
  selectedApp: App;
  setSelectedApp: Dispatch<SetStateAction<App | null>>;
  setInstalledApps: Dispatch<SetStateAction<Set<string>>>;
  installedApps: Set<string>;
  setScreen: Dispatch<SetStateAction<StoreScreen>>;
}) => {
  const [showReviews, setShowReviews] = useState(false);

  const handleInstallApp = (appId: string) => {
    setInstalledApps((prev) => new Set([...prev, appId]));
  };

  const handleUninstallApp = (appId: string) => {
    setInstalledApps((prev) => {
      const newSet = new Set(prev);
      newSet.delete(appId);
      return newSet;
    });
  };

  const navigateBack = () => {
    setSelectedApp(null);
    setScreen("apps");
  };

  const formatReviewCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <LuStar
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-current text-blue-400" : "text-gray-400"}`}
      />
    ));
  };

  const appInfo = [
    {
      id: "reviews",
      label: (
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm text-white/80">
            {selectedApp.rating.toFixed(1)}
          </span>
          <LuStar className="h-4 w-4 text-yellow-400" />
        </div>
      ),
      value: `${formatReviewCount(selectedApp.reviewCount)} reviews`,
    },
    {
      id: "size",
      icon: LuDownload,
      value: `${selectedApp.size}`,
    },
    {
      id: "rating",
      label: (
        <span className="flex-center border p-0.5">
          <span className="text-sm font-extrabold text-white">
            {selectedApp.ageRating}
          </span>
        </span>
      ),
      value: `${selectedApp.ageRating}`,
    },
    {
      id: "downloadCount",
      label: <span className="text-white">1M+</span>,
      value: "Downloads",
    },
  ];

  const isInstalled = installedApps.has(selectedApp.id);

  return (
    <div className="flex w-full flex-col overflow-x-hidden">
      <div className="flex items-center justify-between py-4">
        <Button
          onClick={navigateBack}
          className="rounded-full border-0 bg-white/10 p-2 text-white hover:bg-white/20"
        >
          <LuChevronLeft className="h-5 w-5" />
        </Button>
        <div className="flex gap-2">
          <Button className="rounded-full border-0 bg-white/10 p-2 text-white hover:bg-white/20">
            <LuShare className="h-4 w-4" />
          </Button>
          <Button className="rounded-full border-0 bg-white/10 p-2 text-white hover:bg-white/20">
            <FiMoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-6 w-full px-2">
        <div className="flex w-full flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <Image
              src={selectedApp.icon}
              alt={selectedApp.name}
              width={50}
              height={50}
              objectFit="cover"
              className="h-14 w-14 rounded-xl"
            />

            <div className="flex-1">
              <h1 className="mb-1 text-xl font-bold text-white">
                {selectedApp.name}
              </h1>
              <p className="mb-2 text-sm text-white/70">
                {selectedApp.developer}
              </p>
              {selectedApp.inAppPurchases && (
                <p className="mb-4 text-center text-xs text-white/60">
                  In-App Purchases
                </p>
              )}
            </div>
          </div>

          <div className="no-visible-scrollbar flex items-center gap-3 overflow-x-auto">
            {appInfo.map((info) => (
              <div
                key={info.id}
                className="mb-3 flex flex-shrink-0 flex-col items-center gap-1 border-r border-gray-400 px-6"
              >
                {info.icon ? <info.icon /> : info.label}

                <span className="text-xs text-white/60">{info.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 flex w-full items-center gap-3">
          <Button
            onClick={() => {
              if (isInstalled) {
                handleUninstallApp(selectedApp.id);
              } else {
                handleInstallApp(selectedApp.id);
              }
            }}
            className={`flex-1 rounded-full border-0 bg-transparent py-3 text-sm font-medium ${
              isInstalled
                ? "border border-blue-500 text-blue-500 hover:bg-transparent hover:text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isInstalled ? "Uninstall" : "Install"}
          </Button>

          {isInstalled && (
            <Button className="flex-1 rounded-full border-0 bg-blue-500 py-3 text-sm font-medium text-white hover:bg-blue-600">
              Open
            </Button>
          )}
        </div>
      </div>

      {/* Content Sections */}
      <div className="">
        <div className="no-visible-scrollbar mb-6 flex gap-3 overflow-x-auto pb-2">
          {selectedApp.screenshots.map((screenshot, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={screenshot.url || "/placeholder.svg"}
                width={600}
                height={600}
                alt={screenshot.caption || `Screenshot ${index + 1}`}
                className="h-40 w-28 rounded-xl object-cover"
              />
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-white/80">About this app</h3>
          <p className="whitespace-pre-line text-sm leading-relaxed text-white/70">
            {selectedApp.longDescription}
          </p>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-white">Features</h3>
          <div className="space-y-2">
            {selectedApp.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <LuCheck className="h-4 w-4 text-green-400" />
                <span className="text-sm text-white/70">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ratings & Reviews */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-medium text-white">
              Ratings & Reviews
            </h3>
            <Button
              onClick={() => setShowReviews(!showReviews)}
              className="h-7 w-7 rounded-full border-0 bg-white/10 p-2 text-sm text-white hover:bg-white/20"
            >
              <LuChevronRight />
            </Button>
          </div>

          <div className="mb-4 rounded-xl bg-white/10 p-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {selectedApp.rating.toFixed(1)}
                </div>
                <div className="mb-1 flex items-center justify-center gap-1">
                  {renderStars(selectedApp.rating)}
                </div>
                <div className="text-xs text-white/60">
                  {selectedApp.reviewCount}
                </div>
              </div>
              <div className="flex-1">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const percentage = Math.random() * 100; // Mock data
                  return (
                    <div key={stars} className="mb-1 flex items-center gap-2">
                      <span className="w-2 text-xs text-white/60">{stars}</span>
                      <div className="h-1 flex-1 rounded-full bg-white/20">
                        <div
                          className="h-1 rounded-full bg-blue-400"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {showReviews &&
            selectedApp.reviews.map((review) => (
              <div key={review.id} className="mb-3 rounded-xl bg-white/10 p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-sm font-medium text-white">
                        {review.userName}
                      </span>
                      <div className="flex items-center gap-1">
                        {/*{renderStars(review.rating)}*/} 4
                      </div>
                    </div>
                    <span className="text-xs text-white/60">{review.date}</span>
                  </div>
                </div>
                <h4 className="mb-1 text-sm font-medium text-white">
                  {review.title}
                </h4>
                <p className="mb-2 text-sm text-white/70">{review.comment}</p>
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <button className="flex items-center gap-1">
                    <span>👍</span>
                    <span>Helpful ({review.helpful})</span>
                  </button>
                  <button>
                    <LuFlag className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* App Information */}
        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-white">Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-white/60">Category</span>
              <span className="text-sm capitalize text-white">
                {selectedApp.category}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-white/60">Languages</span>
              <span className="text-sm text-white">
                {selectedApp.languages.slice(0, 3).join(", ")}
              </span>
            </div>
          </div>
        </div>

        {/* Version History */}
        <div className="mb-6">
          <h3 className="mb-3 font-semibold text-white">What&apos;s New</h3>
          <div className="rounded-xl bg-white/10 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium text-white">
                Version {selectedApp.version}
              </span>
              <span className="text-xs text-white/60">3 days ago</span>
            </div>
            <p className="text-sm text-white/70">{selectedApp.releaseNotes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetails;
